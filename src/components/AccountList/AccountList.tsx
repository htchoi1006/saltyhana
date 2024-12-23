import { AccountListContainer, AccountItem } from "./styles";
interface Account {
  accountNumber: string; // 계좌 번호
  accountAlias: string; // 계좌 별칭
  accountBalance: number; // 계좌 잔액
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
          {account.accountAlias}
          <br />
          {account.accountNumber}
        </AccountItem>
      ))}
    </AccountListContainer>
  );
}
