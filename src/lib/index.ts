export interface UserProfileData {
	name: string
	email: string
	currency: string
}

export interface AccountData {
	id: string
	name: string
	type: string
	balance: number
}

export interface AccountList {
	accounts: AccountData[]
}

export interface RecordData {
	id: string
	accountId: string
	amount: number
	created: string
	type: string
	category: string
}

export interface AccountRecord {
	records: RecordData[]
	id: string
	name: string
}

export interface AllRecords {
	records: AccountRecord[]
}