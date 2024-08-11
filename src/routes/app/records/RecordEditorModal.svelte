<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton'

	export let id = ''
	export let category: string
	export let accountId = ''
	export let accountName = ''
	let categories = [
		'Food & Drink',
		'Transportation',
		'Bills',
		'Education',
		'Health',
		'Software'
	].sort()
	export let types = ['Income', 'Expense']
	export let amount = ''
	export let created = ''
	console.log(created)
	export let operation = 'Add'

	const modalStore = getModalStore()
</script>

{#if $modalStore[0]}
	<div class="p-6 space-y-4 bg-surface-50">
		<h2 class="h2">{operation} record</h2>
		<form action="?/{operation.toLowerCase()}" method="POST" class="space-y-3">
			<input type="text" name="id" id="id" bind:value={id} class="hidden" />
			<input bind:value={created} class="input" type="datetime-local" name="date" id="date" />
			<select bind:value={category} name="category" id="category" class="select" required>
				<optgroup>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</optgroup>

				<optgroup label="--------------------------">
					<option value="Initial balance">Initial balance</option>
					<option value="Other">Other</option>
				</optgroup>
			</select>
			<select name="type" id="type" class="select" required>
				{#each types as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
			<input
				class="input"
				name="amount"
				type="text"
				placeholder="Amount"
				bind:value={amount}
				required
			/>

			<div class="flex flex-row justify-end w-full space-x-2">
				{#if id}
					<button
						formaction="?/delete"
						class="btn variant-outline-error text-error-500"
						type="submit"><i class="fa-solid fa-trash"></i></button
					>
				{/if}
				<div>
					<button class="btn variant-outline" type="button" on:click={() => modalStore.close()}
						>Cancel</button
					>
					<button class="btn variant-filled" type="submit">{operation}</button>
				</div>
			</div>
		</form>
	</div>
{/if}
