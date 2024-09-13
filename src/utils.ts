export const IS_FAKE = true;
export const HUB_NODE = IS_FAKE ? "fake.dev" : "waterhouse.os";

export const soundEffectCommands = {
  '/fart': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/wet.mp3',
  '/no': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/hell-naw-dog.mp3',
  '/yes': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/oh-yes.mp3',
  '/why': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/why.mp3',
  '/people': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/the-people.mp3',
  '/robust': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/robust-josh.mp3',
  '/robustness': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/robust-basile.mp3',
};

export const maybePlayTTS = (msg: string) => {
  const mute = sessionStorage.getItem("mute") === "true";
  if (!mute) {
    const commandPrefix = "/tts ";
    if (msg.startsWith(commandPrefix)) {
      const textToSpeak = msg.slice(commandPrefix.length);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const maybePlaySoundEffect = (msg: string) => {
  if (msg in soundEffectCommands) {
    const link = soundEffectCommands[msg];
    const sound = new Audio(link);
    sound.play();
  }
}

export const imageCommands = {
  '/die': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/die.webp',
  '/kino': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/kino.webp',
  '/panda': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/panda.jpeg',
  '/dev': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/dev.jpeg',
  '/tiger': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/tiger.jpeg',
  '/wow': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/wow.jpeg',
  '/cry': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/cry.jpeg',
  '/ok': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/ok.jpeg',
  '/oops': 'https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/oops.jpeg',
}

export const maybeReplaceWithImage = (msg: string) => {
  if (msg in imageCommands) {
      return imageCommands[msg];
  }
  return msg
}

export const linkRegex = /^https?:\/\/\S+$/i;
export const imageRegex = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp)$/i;

export function isImageUrl(url: string) {
  return imageRegex.test(url);
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  if (date < oneWeekAgo) {
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  } else {
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    const day = isToday ? 'Today' : isYesterday ? 'Yesterday' : date.toLocaleDateString('en-US', { weekday: 'short' });
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${day} ${time}`;
  }
}