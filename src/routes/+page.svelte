<script>
	import Header from '$lib/header.svelte';
	import {onMount} from 'svelte';
	import {getCookie, userInfo} from '$lib/store';

	$: message = '';
	$: signatureHex = '';

	let provider = '';

	function createMessage(message) {

		const prefix = "17DqbMhfHzLGjYqmiLAjhzAzKf3f1sK9Rc";

		if (message.length < prefix.length) {
			return prefix + message;
		}

		if (message.startsWith(prefix)) {
			return message;
		}

		return prefix + message;
	}

	async function signMessage() {
		if (getCookie('provider') == 'panda') {
			if (await window?.panda?.isConnected()) {
				const response = await window?.panda?.signMessage({message: message});
				signatureHex = response?.sig ?? response.signature;
			} else {
				await window?.panda?.connect();
			}
		} else {
			if (window && window.relayone) {
				console.log(createMessage(message));
				const response = await window?.relayone?.sign(createMessage(message));
				signatureHex = response.value;
			}
		}
	}

	async function getPandaUserProfile() {
		await waitForPanda();
		if (await window?.panda?.isConnected()) {
			const response = await window?.panda?.getSocialProfile();
			let profile = {
				name: response.displayName,
				avatar: response.avatar
			};

			userInfo.update((data) => {
				data = profile;
				return JSON.parse(JSON.stringify(data));
			});
		} else {
			await window?.panda?.connect();
		}
	}

	function copyTextToClipboard() {
		const textToCopy = signatureHex;
		if (textToCopy) {
			navigator.clipboard
					.writeText(textToCopy)
					.then(() => {
						const copyButtonText = document.getElementById('copyButtonText');
						copyButtonText.innerText = 'Copied';
						setTimeout(() => {
							copyButtonText.innerText = 'COPY';
						}, 3000);
					})
					.catch((err) => {
						console.error('Error in copying text: ', err);
					});
		}
	}

	async function waitForPanda() {
		return new Promise(resolve => {
			const checkForPanda = () => {
				if (window.panda !== undefined) {
					clearInterval(intervalId);
					resolve();
				}
			};

			const intervalId = setInterval(checkForPanda, 100);
		});
	}

	async function waitForRelayone() {
		return new Promise(resolve => {
			const checkForRelayone = () => {
				if (window.relayone !== undefined) {
					clearInterval(intervalId);
					resolve();
				}
			};

			const intervalId = setInterval(checkForRelayone, 100);
		});
	}

	async function getRelayoneUserProfile() {
		await waitForRelayone();
		const token = await window.relayone.authBeta();
		const [payload, signature] = token.split('.');
		const user = JSON.parse(atob(payload));
		let profile = {
			name: user.paymail,
			avatar: 'https://a.relayx.com/u/' + user.paymail
		};

		userInfo.update((data) => {
			data = profile;
			return JSON.parse(JSON.stringify(data));
		});
	}

	onMount(async () => {
		provider = getCookie('provider');
		if(provider === ''){
			window.location.href = 'signin'
		} else if (provider === 'panda') {
			await getPandaUserProfile();
		} else {
			await getRelayoneUserProfile();
		}
	});

</script>

<Header userName={$userInfo?.name} userIcon={$userInfo?.avatar} {provider}/>
<div class="font-Inter flex flex-col items-center hscreen md:py-16 py-8">
	<h1 class="text-[#252525] text-[32px] font-semibold mb-2">Create your Signature</h1>
	<p class="text-center px-10 md:p-0 text-[#6D6D6D] text-[14px] mb-8">
		We are happy to have you. To use our services, you need to create your signature
	</p>
	<div class="p-8 relative container rounded rounded-3xl mb-8">
		<p class="text-[16px] font-medium mb-1 text-start text-[#252525]">Your message goes here:</p>
		<!-- <input type="text" placeholder="Your input here" class="bg-transparent border-2 border-gray-300 rounded-md p-2 w-full"> -->
		<textarea
				bind:value={message}
				class="bg-transparent border-2 border-gray-300 rounded-md p-2 md:w-full mb-12"
		/>
		<button class="button mt-2" on:click={() => signMessage()}> CONFIRM</button>
	</div>

	<div class="p-8 relative container mx- rounded rounded-3xl">
		<p class="text-[16px] font-medium mb-1 text-start text-[#252525]">
			Your signature result comes out here:
		</p>
		<textarea
				readonly
				bind:value={signatureHex}
				id="signatureResult"
				class="bg-transparent border-2 border-gray-300 rounded-md p-2 w-full mb-12 text-[#252525]"
		/>
		<button id="copyButton" class="button" on:click={() => copyTextToClipboard()}>
			<img src="/copy.svg" alt="" class="inline-block h-4 w-4 mr-2"/><span id="copyButtonText"
		>COPY</span
		>
		</button>
	</div>
</div>

<style>
	/* Add custom styling here if needed */
	.container {
		@apply flex flex-col justify-center h-[278px] w-[583px];
		background-color: white;

		@media (max-width: 767px) {
			max-width: 95%;
		}
	}

	.button {
		@apply text-[#FFFFFF] bg-[#0056B3] border border-[#0000001A] font-medium py-2 px-4 rounded w-full;
		/* margin: 10px; */
	}
</style>