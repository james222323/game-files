runOnStartup(async runtime => {
    runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	await _InitWakerWorker(runtime);
});

async function OnBeforeProjectStart(runtime) {
    maybeCreateManager(runtime);
	
    //avoid scrolling page with arrow keys
    self.addEventListener('keydown', ev => {
        if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
            ev.preventDefault();
        }
    });

    //fetch project files
    //levelData
    const levelDataResponse = await fetch("jsons/levelData.json");
    runtime.objects.levelData.getFirstInstance().setJsonDataCopy(await levelDataResponse.json());
    //achievementData
    const achievementDataResponse = await fetch("jsons/achievementData.json");
    runtime.objects.achievementData.getFirstInstance().setJsonDataCopy(await achievementDataResponse.json());
	//nameData
    const nameDataResponse = await fetch("jsons/nameTemplate.json");
    runtime.objects.names.getFirstInstance().setJsonDataCopy(await nameDataResponse.json());
	//skinData
    const skinDataResponse = await fetch("jsons/skinData.json");
    runtime.objects.skinDataJSON.getFirstInstance().setJsonDataCopy(await skinDataResponse.json());


    //try loading save
    const saveState = await runtime.storage.getItem("save");

    if (saveState == null || !isJsonString(saveState)) await loadDefaultSave(runtime);
    else runtime.objects.save.getFirstInstance().setJsonDataCopy(JSON.parse(saveState));
}

function maybeCreateManager(runtime) {
    const manager = runtime.objects.globalManager.getFirstInstance();
    if (!manager) {
        runtime.objects.globalManager.createInstance(0, 0, 0)
    }
}

async function loadDefaultSave(runtime) {
    const save = runtime.objects.save.getFirstInstance();
    const saveDataResponse = await fetch("jsons/saveState.json");
    save.setJsonDataCopy(await saveDataResponse.json());
	runtime.callFunction("newSave")
}

// code to keep the multiplayer on
async function _InitWakerWorker(runtime) {
    globalThis._wakerWorker = await runtime.createWorker("background-waker.js")
    globalThis._wakerWorker.onmessage = (e) => {
        if (e.data === "tick" && globalThis.sdk_runtime.IsSuspended())
            globalThis.sdk_runtime.Tick(null, false, "background-wake");
    };
    globalThis._wakerWorker.postMessage("");
}

// text fix
const oldRenderText = C3.Gfx.RendererText;
C3.Gfx.RendererText = class RendererText extends oldRenderText {
    SetSize(cssWidth, cssHeight, zoom) {
        super.SetSize(cssWidth, cssHeight, 1.5)
    }
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}