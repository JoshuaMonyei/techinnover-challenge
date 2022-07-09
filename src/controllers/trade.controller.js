const catchAsync = require("../utils/catchAsync");
const { Radar, Borrower, CreditUser } = require("../models");
const { errorResponse, successResponse } = require("../utils/apiResponse");
const { radarService, billingService } = require("../services");
const { decrypt, encrpyt } = require("../middlewares/auth");

const fetchNew = async (req, res) => {
	try {
		const { mobile_number, type, bvn } = req.body;
		switch (type) {
			case "mobile_number":
				let input = "Phone No";
				// find number in borrower
				const borrower = await Borrower.findOne({
					phones: { $in: mobile_number },
					businessId: req.app.businessId,
				});
				if (borrower) {
					debtor = borrower;
				} else {
					const borrower2 = await CreditUser.findOne({
						phone: mobile_number,
						businessId: req.app.businessId,
					});
					if (borrower2) {
						debtor = borrower2;
					} else {
						const logRequest = await billingService.notifyBillingForFailure(
							req,
							"get borrower connected banks"
						);
						return errorResponse(
							res,
							400,
							"Please onboard this phone number on your business dashboard"
						);
					}
				}
				const connectedAccounts = await radarService.fetchBankAccountsFromRadar(
					mobile_number
				);
				// console.log(8888, connectedAccounts)
				if (connectedAccounts.length === 0) {
					const logRequest = await billingService.notifyBillingForFailure(
						req,
						"get borrower connected banks",
						debtor.id
					);
					return errorResponse(
						res,
						400,
						"No bank accounts found for this phone number"
					);
				}
				//save to DB
				const connectedAccountsWithNumber = connectedAccounts.map(account => ({ 
					...account, mobile_number
				}));
				let radarData = {
					"$addToSet": {
						banks: { "$each": connectedAccountsWithNumber },
					},
					"$set": {
						name: debtor.fullname,
						borrowerId: debtor.id,
						mobile_number: mobile_number,
						type: input,
						businessId: req.app.businessId,
						appId: req.app._id,
						created_at: new Date(),
					}
				};
				//
				let filter = {
					borrowerId: debtor.id,
					businessId: req.app.businessId,
				};
				let radar = await Radar.findOneAndUpdate(filter, radarData, {
					new: true, // return new doc if one is upserted
					upsert: true, // if doc not found, create it
					setDefaultsOnInsert: true,
				});
				// bill the user 10 naira
				const logger = await billingService.notifyBillingForSuccess(
					req,
					"get borrower connected banks",
					debtor.id
				);
				// remove accountId from connectedAccounts
				connectedAccounts.forEach((account) => {
					delete account.accountId;
				});
				successResponse(res, 200, "success", radar);
				break;
			case "bvn":
				successResponse(res, 200, "Coming soon..");
				break;
			default:
				const logRequest = await billingService.notifyBillingForFailure(
					req,
					"get borrower connected banks"
				);
				return errorResponse(res, 400, "error");
		}
	} catch (err) {
		const logRequest = await billingService.notifyBillingForFailure(
			req,
			"get borrower connected banks"
		);
		return errorResponse(res, 400, "error");
	}
};

const getExisting = async (req, res) => {
	try {
		const { mobile_number, type, bvn } = req.body;
		switch (type) {
			case "mobile_number":
				const connectedAccounts = await radarService.getAccountsFromDB(
					req.app.businessId,
					mobile_number
				);
				const billUser = await billingService.notifyBillingForSuccess(
					req,
					"radar borrower history",
					connectedAccounts.borrowerId
				);
				successResponse(res, 200, "success", connectedAccounts);
				break;
			case "bvn":
				successResponse(res, 200, "Coming soon..");
				break;
			default:
				const logger = await billingService.notifyBillingForFailure(
					req,
					"radar borrower history"
				);
				return errorResponse(res, 400, "error");
		}
	} catch (err) {
		const logger = await billingService.notifyBillingForFailure(
			req,
			"radar borrower history"
		);
		return errorResponse(res, 400, "error");
	}
};

const getAll = async (req, res) => {
	try {
		const connectedAccounts = await radarService.getAllAccountsFromDB(
			req.app.businessId
		);
		const logger = await billingService.notifyBillingForSuccess(
			req,
			"radar history"
		);
		successResponse(res, 200, "success", connectedAccounts);
	} catch (err) {
		const logger = await billingService.notifyBillingForFailure(
			req,
			"radar history"
		);
		return errorResponse(res, 400, "error");
	}
};

const getAllBorrowerBanks = async (req, res) => {
  try {
    const { borrowerId } = req.params;
    const borrower = await Borrower.findOne({
      _id: borrowerId,
      businessId: req.app.businessId,
    });
    if (!borrower) {
      return errorResponse(res, 400, "Borrower not found");
    }

    const connectedAccounts = await radarService.getAllBorrowerBanksFromDB(
      req.app.businessId,
      borrowerId
    );
    if (!connectedAccounts) {
      return errorResponse(
        res,
        400,
        "No radar data available for this borrower"
      );
    }
    return successResponse(res, 200, "success", connectedAccounts);
  } catch (err) {
    return errorResponse(res, 400, "error");
  }
};

module.exports = {
	fetchNew,
	getExisting,
	getAll,
	getAllBorrowerBanks,
};
