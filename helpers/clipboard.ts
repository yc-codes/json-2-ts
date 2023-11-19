const ClipboardHelper = {
  checkOrAskPermission: async function () {
    try {
      await navigator.clipboard.readText();
      return true;
    } catch (error) {
      alert("Do not have Clipboard Permission.");
      return false;
    }
  },
  read: async function (): Promise<string> {
    if (!(await ClipboardHelper.checkOrAskPermission())) {
      return "";
    }
    return navigator.clipboard.readText();
  },
  write: async function (text: string) {
    if (!(await ClipboardHelper.checkOrAskPermission())) {
      return false;
    }
    return navigator.clipboard.writeText(text);
  },
};

export default ClipboardHelper;
