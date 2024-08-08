import { error as svelteError, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { AllRecords, RecordData } from '$lib'

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
	const { session } = await safeGetSession()

	if (!session) {
		redirect(303, '/auth/signin')
	}

	const { data, error } = await supabase
		.from('accounts')
		.select('id,name')
		.eq('user', session.user.id)

	if (!data || error) {
		svelteError(500, 'Could not fetch accounts')
	}

	const allRecords: AllRecords = { records: [] }
	for (const account of data) {
		const { data: records, error } = await supabase
			.from('records')
			.select('id,account,amount,created_at,type,category')
			.eq('account', account.id)

		if (error) {
			svelteError(500, 'Could not fetch records')
		}

		allRecords.records.push({
			id: account.id,
			name: account.name,
			records: records.map((record: any) => ({
				...record,
				accountId: record.account,
				created: record.created_at
			})) as RecordData[]
		})
	}

	return allRecords
}
