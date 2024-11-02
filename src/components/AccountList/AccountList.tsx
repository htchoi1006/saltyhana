import React from "react";
import { AccountListContainer, AccountItem } from "./styles";

interface Account {
  accountNumber: string;
  accountName: string;
  balance: number;
}

interface AccountListProps {
  accounts: Account[];
  selectedAccount: Account;
  onSelectAccount: (account: Account) => void;
}

export default function AccountList(props: AccountListProps) {
  const { accounts, selectedAccount, onSelectAccount } = props;

  return (
    <AccountListContainer>
      {accounts.map((account) => (
        <AccountItem
          key={account.accountNumber}
          className={
            selectedAccount.accountNumber === account.accountNumber
              ? "active"
              : ""
          }
          onClick={() => onSelectAccount(account)}
        >
          {account.accountName}
          <br />
          {account.accountNumber}
        </AccountItem>
      ))}
    </AccountListContainer>
  );
}
