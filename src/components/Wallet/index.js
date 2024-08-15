import React, { useEffect, useState } from "react";
import WalletRecentActivities from "../WalletRecentActicities";
import { addCommonData, getData } from "@/apis/common";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader";
import CommonDialog from "../Dialogs/CommonDialog";
import DefaultInput from "../Inputs/DefaultInput";

const Wallet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [redeemLoading, setRedeemLoading] = useState(false);

  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(-1, 0, "payment/get-wallet-details");
      const response2 = await getData(-1, 0, "payment/bank-account");
      setData(response);
      setAccounts(response2);
      console.log(response);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const redeemRequestHandler = async () => {
    try {
      setRedeemLoading(true);
      const response = await addCommonData(
        { account: currentAccount, amount: redeemAmount },
        "payment/redeem-request"
      );
      // setData(response);
      console.log(response);
      toast.success("Your redeem request is submitteed");
      getAllData();
      setRedeemOpen(false);
      setRedeemLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setRedeemLoading(false);
    }
  };

  const addAccountHandler = async () => {
    try {
      setAccountLoading(true);
      const response = await addCommonData(
        {
          accountHolderName: accountHolderName,
          accountNumber: accountNumber,
          phone: phone,
          bankName: bankName,
          ifscCode: ifscCode,
          branchName: branchName,
        },
        "payment/bank-account"
      );
      // setData(response);
      console.log(response);
      toast.success("Your Bank account is added.");
      getAllData();
      setIsOpen(false);
      setAccountLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setAccountLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div>
          <div className="w-full px-5 flex flex-col md:flex-row  justify-between py-7 rounded-md shadow-md bg-white mt-5">
            <div className="flex-1 ">
              <div className="text-xl text-gray-500">Total balance</div>
              <div className="text-5xl my-4 font-semibold text-gray-800">
                ₹{data?.amount}
              </div>
            </div>
          </div>
          {/*RECENT ACTIVITY  */}
          <div className="mt-5">
            <div className="flex w-full justify-between mb-5">
              <div className="font-semibold txet-gray-800 ">Bank accounts</div>
              <button
                onClick={() => setIsOpen(true)}
                className="text-bluePrimary text-sm flex items-center justify-between space-x-2 border border-dashed border-bluePrimary rounded-md px-2 py-2 hover:border-double hover:font-semibold"
              >
                <img src={"/images/addbank.svg"} className="w-7" />
                <div>Add Bank Account</div>
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {accounts.map((item, index) => (
                <div
                  className="p-2 rounded-md shadow bg-white flex items-center space-x-4"
                  key={index}
                >
                  <img
                    className="h-12 w-12 rounded-md "
                    src={"/images/addbank.svg"}
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      **********
                      {item.accountNumber.substr(item.accountNumber.length - 4)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.bankName}, {item.branchName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.accountHolderName}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setCurrentAccount(item);
                      setRedeemOpen(true);
                    }}
                    className="text-green-400"
                  >
                    Redeem
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <WalletRecentActivities />
          </div>
        </div>
      )}

      {redeemOpen && (
        <CommonDialog
          title={"Redeem Request"}
          on={redeemOpen}
          setOn={setRedeemOpen}
        >
          <div>
            <DefaultInput
              label={"Amount"}
              value={redeemAmount}
              onChange={(e) => setRedeemAmount(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-600">
            Note: Amount should not be grater than wallet amount
          </div>

          <button
            onClick={() => redeemRequestHandler()}
            className="w-full mt-4 py-2 bg-bluePrimary text-white rounded-md hover:bg-blue-800"
          >
            Redeem
          </button>
        </CommonDialog>
      )}
      {isOpen && (
        <CommonDialog
          title={"Add new bank account"}
          on={isOpen}
          setOn={setIsOpen}
        >
          <div>
            <DefaultInput
              label={"Account Holder's Name"}
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
            />
            <DefaultInput
              label={"Account Number"}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <DefaultInput
              label={"Phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <DefaultInput
              label={"Bank Name"}
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            <DefaultInput
              label={"IFSC number"}
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
            />
            <DefaultInput
              label={"Branch Name"}
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>

          <button
            onClick={() => addAccountHandler()}
            className="w-full mt-4 py-2 bg-bluePrimary text-white rounded-md hover:bg-blue-800"
          >
            Add
          </button>
        </CommonDialog>
      )}
    </div>
  );
};

export default Wallet;
