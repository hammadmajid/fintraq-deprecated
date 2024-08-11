<script lang="ts">
	import RecordEditorModal from './RecordEditorModal.svelte'
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton'

	export let data

	let records = data.records

	let modalStore = getModalStore()
	const addRecordModal: ModalComponent = { ref: RecordEditorModal }
	const modal: ModalSettings = {
		type: 'component',
		component: addRecordModal
	}

	function triggerEditModal(
		id: string,
		accountId: string,
		accountName: string,
		category: string,
		type: string,
		amount: number,
		created: string
	) {
		const makeEditModal: ModalComponent = {
			ref: RecordEditorModal,
			props: { id, accountId, accountName, category, type, amount, created, operation: 'Update' }
		}
		const editModal: ModalSettings = {
			type: 'component',
			component: makeEditModal
		}

		modalStore.trigger(editModal)
	}
</script>

<svelte:head>
	<title>Records | Fintraq</title>
</svelte:head>

<main
	class="flex flex-col items-center justify-start w-full min-h-screen p-4 mx-auto space-y-6 md:w-3/4"
>
	<header class="flex flex-row justify-between w-full">
		<h1 class="h1">Records</h1>
		<button
			class="btn variant-filled btn-sm md:btn-lg"
			type="button"
			on:click={() => modalStore.trigger(modal)}
			><i class="fa-solid fa-plus"></i><span class="ml-2">Add record</span></button
		>
	</header>
	{#if records}
		<div class="table-container">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Account</th>
						<th>Category</th>
						<th>Type</th>
						<th>Amount</th>
						<th>Created</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{#each records as account}
						<tr>
							<td>{account.name}</td>
							{#each account.records as record}
								<td>{record.category}</td>
								<td>{record.type}</td>
								<td>{record.amount}</td>
								<td>{record.created.slice(0, 10)}</td>
								<td>
									<button
										class="btn variant-outline btn-sm"
										type="button"
										on:click={() =>
											triggerEditModal(
												record.id,
												account.id,
												account.name,
												record.category,
												record.type,
												record.amount,
												record.created
											)}><i class="fa-solid fa-edit"></i></button
									>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</main>
