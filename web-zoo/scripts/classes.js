/**
 * Represents a generic Animal with a distinct sound.
 * @param {string} sound - The unique sound associated with the animal.
 */
class Animal {
  constructor(sound) {
    this.sound = sound;
  }
  /**
   * Generates an animal-specific phrase by interspersing the given phrase with the animal sound.
   * 
   * @param {string} phrase - The input text to be transformed into the animal-specific phrase.
   * @returns {string} The animal-specific phrase with the unique sound.
   */
  speak(phrase) {
    if (!phrase) return "";

    let animalPhrase = phrase.trim().split(" ").join(` ${this.sound} `);

    //Add the animal sound at the end
    animalPhrase += ` ${this.sound}`;

    return animalPhrase;
  }
}

export class Lion extends Animal {
  constructor() {
    super("roar");
  }

  // ...specific methods and attributes based on animal specie
}

export class Pig extends Animal {
  constructor() {
    super("oink");
  }

  // ...specific methods and attributes based on animal specie
}

export class Dog extends Animal {
  constructor() {
    super("woof");
  }

  // ...specific methods and attributes based on animal specie
}

export class Snake extends Animal {
  constructor() {
    super("sss");
  }

  // ...specific methods and attributes based on animal specie
}
