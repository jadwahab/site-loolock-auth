<script>
	import { fly, fade } from 'svelte/transition';
</script>

<div
	class="fixed top-0 bottom-0 left-0 right-0 z-10 w-full bg-[#252525] bg-opacity-30 overflow-y-auto box-content"
	transition:fade
>
	<div class="opacity-100 z-12" transition:fly={{ y: 500 }}>
		<div class="flex items-center justify-center h-screen">
			<div class="flex flex-col justify-center items-center w-fit rounded-2xl">
				<slot />
			</div>
		</div>
	</div>
</div>
