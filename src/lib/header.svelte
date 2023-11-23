<script>
    let showPopup = false;
	import { browser } from '$app/environment';
    import { setCookie } from "./store";
    import utils  from '$lib/utils.js';

    export let userName;
    export let userIcon;
    export let provider;

    function togglePopup() {
        showPopup = !showPopup;
    }

    function onClickLogOut(){
        setCookie("provider","")
        window.location.href = '/signin'
    }

</script>

<div class="md:p-6 md:px-8 py-8 font-Inter flex justify-between items-center bg-gray-100 p-2 dropdown">
    <div>
        <!-- <span style="display:block; text-overflow: ellipsis;width: 200px;overflow: hidden; white-space: nowrap;">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        </span> -->
        <h1 class="md:text-[28px] text-[18px] font-bold text-[#252525] w-[200px] md:w-[400px] "style="display:block; text-overflow: ellipsis;overflow: hidden; white-space: nowrap;">Hi {userName} 👋🏼</h1>
        <p class="text-[14px] text-[#252525] font-normal md:block hidden">Welcome to Bitcoin Message Signer</p>
    </div>
    <div class="flex">
        <button class="py-1 flex items-center md:ml-4 border-2 border-gray-300 rounded rounded-[40px] bg-transparent text-[#252525] font-bold px-2 md:py-2 md:px-4 rounded" on:click={togglePopup}>
            <div class="bg-[#0056B3] rounded-full md:h-10 md:w-10 w-8 h-8 flex items-center justify-center text-white font-bold text-lg">
                    <img src={userIcon} alt="" />
            </div>
            <div class="md:block hidden flex flex-col ml-2 md:mr-4 text-start">
                <span>
                    {userName}</span>
                <p class="text-xs font-normal"> { "Signed in with " + provider } </p>
            </div>
            {#if browser}
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z" clip-rule="evenodd" />
            </svg>
            {/if}
        </button>
        {#if showPopup}
        <div class="rounded rounded-xl absolute top-24 right-8 bg-white p-2 shadow-lg p-4 px-8" use:utils.clickOutside on:click_outside={togglePopup}>
            <div class="flex justify-center items-center">
                <div class="bg-[#0056B3] rounded-full h-10 w-10 flex items-center justify-center text-white font-bold text-lg">
                    <img src={userIcon} alt="" />
                </div>
                <div class="flex flex-col ml-2 text-start">
                    <span class="text-[#252525] font-medium">{userName}</span>
                    <p class="text-xs font-normal">{"Signed in with " + provider}</p>
                </div>
            </div>
            <div class="flex justify-center items-center mt-1">
                <img src="/logout.svg" alt="" class="h-5 w-5">
                <a href="" on:click={onClickLogOut} class="block px-4 font-semibold py-2 text-4 text-[#D73535]">Log Out</a>
            </div>
        </div>
        {/if}
    </div>
</div>
