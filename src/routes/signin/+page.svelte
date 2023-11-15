<script>
  import Modal from "../../lib/modal.svelte";
  import {getCookie, setCookie} from "../../lib/store";
  import { onMount } from "svelte";


  async function signInWithRelayx() {

    setCookie("provider","relayX");
    const wallet = window?.relayone
    const isRelayXReady = await wallet?.isLinked();

    if (isRelayXReady) {
        setCookie("processInitiated",false);
        window.location.href = "/"
    } else if (getCookie("processInitiated") === "true"){
        window.location.href = "/signin"
    } else {
       setCookie("processInitiated",true);
       window.open(
        "https://relayx.pro/",
                "_blank"
      );
    }
  }

  async function signInWithPandaWallet() {

    setCookie("provider","panda");
    const wallet = window?.panda
    const isPandaReady = wallet?.isReady;

    if (isPandaReady){
      setCookie("processInitiated",false)
      if(await wallet.isConnected()){
        window.location.href = "/"
      } else {
        await window?.panda?.connect();
      }
    } else if (getCookie("processInitiated") === "true") {
      setCookie("processInitiated", false)
      window.location.href = "/signin"
    } else {
      setCookie("processInitiated",true)
      window.open(
              "https://chromewebstore.google.com/detail/panda-wallet/mlbnicldlpdimbjdcncnklfempedeipj",
              "_blank"
      );
    }
  }

  onMount( async () => {
    setCookie("processInitiated", false);
    if (getCookie("provider") !== '') {
      if (getCookie("provider") == "relayX") {
        const wallet = window?.relayone
        const isRelayXReady = await wallet?.isLinked();
        if (isRelayXReady) {
          window.location.href = "/"
        }
      }
      if (getCookie("provider") == "panda") {
        const wallet = window?.panda
        const isPandaReady = wallet?.isReady;
        if (isPandaReady) {
          if (await wallet.isConnected()) {
            window.location.href = "/"
          } else {
            await window?.panda?.connect();
          }
        }
      }
    }
  })
</script>


<div class="font-Inter flex flex-col items-center justify-center h-screen">
  <Modal>
    <h1 class="text-[#252525] text-[32px] font-semibold mb-8 ">Welcome to Bitcoin Message Signer</h1>
    <div class="p-8 relative container mx-auto rounded rounded-3xl">
        <!-- <img src="/cross.svg" class="absolute right-4 top-4" alt=""> -->
      <a href="/">
        <img src="/cross.svg" class="absolute right-4 top-4 cursor-pointer" alt="">
      </a>

      <h1 class="text-[28px] text-[#252525] font-bold mb-4">Sign in</h1>
      <p class="text-[14px] font-normal mb-4">Please sign in to enable spending</p>
      <button class="button" on:click={() => signInWithRelayx()}>
        <img src="/RelayX.svg" alt="Relayx Icon" class="inline-block h-4 w-4 mr-2">
        Sign in with Relayx
      </button>
        <div class="flex items-center w-full my-4">
            <hr class="border-1 border-[#0000001A] flex-grow" />
            <div class="mx-4 text-[#252525]">OR</div>
            <hr class="border-1 border-[#0000001A] flex-grow" />
        </div>


          <button class="button bg-green-500" on:click={() => signInWithPandaWallet()}>
            <img src="/wallet.svg" alt="PandaWallet Icon" class="inline-block h-4 w-4 mr-2">
            Sign in with PandaWallet
          </button>
    </div>
  </Modal>
</div>

  <style>
    /* Add custom styling here if needed */
.container {
    @apply flex flex-col justify-center items-center h-[345px] w-[583px];
    background-color: white;
}

  .button {
    @apply bg-transparent border border-[#0000001A] text-[#2F2F2F] font-medium py-2 px-4 rounded w-full;
    margin: 10px;
  }
  </style>
