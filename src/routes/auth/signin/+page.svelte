<script lang="ts">
	import type { ActionData } from './$types'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'

	export let form: ActionData

	let toastStore = getToastStore()
	const errorToast: ToastSettings = {
		message: form?.code + ' ' + form?.message ?? '500: Internal server error',
		background: 'variant-filled-error',
		autohide: false
	}

	if (form?.code) {
		toastStore.trigger(errorToast)
	}
</script>

<svelte:head>
	<title>Sign in | Fintraq</title>
</svelte:head>

<main
	class="flex flex-col gap-6 justify-center items-start px-4 py-12 mx-auto min-h-screen md:w-3/4"
>
	<div class="container mx-auto space-y-4">
		<h1 class="h1">Welcome back!</h1>
		<p>Enter your information below to login on Fintraq</p>
	</div>
	<form class="space-y-2 w-full md:w-1/2" method="POST">
		<label for="email" class="label">
			<input
				class="input"
				type="email"
				name="email"
				id="email"
				placeholder="Email address"
				required
			/>
		</label>
		<label class="label">
			<input
				class="input"
				placeholder="Password"
				type="password"
				name="password"
				id="password"
				required
			/>
		</label>

		<button class="btn variant-filled" type="submit"
			>Sign In <i class="ml-2 fa-solid fa-arrow-right-to-bracket"></i></button
		>
	</form>
	<p>
		Don't have an account? <a
			href="/auth/signup"
			class="font-medium text-blue-600 transition-colors duration-300 hover:text-blue-800"
			>Sign up</a
		>
	</p>
</main>
