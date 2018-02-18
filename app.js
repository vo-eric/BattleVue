new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `You hit the monster for ${damage} damage!`
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttacks();
      this.checkWin();
    },
    specialAttack: function() {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `You bashed the monster for ${damage} damage!`
      });
      this.checkWin();
      this.playerHealth -= this.monsterAttacks();
      this.checkWin()
    },
    heal: function() {
      let healed = Math.max(1, Math.ceil(Math.random() * 15));
      if (this.playerHealth <= 90) {
        this.playerHealth += healed;
      } else {
        this.playerHealth = 100
      }
      this.turns.unshift({
        isPlayer: true,
        text: `You healed for ${healed} HP!`
      })
      this.playerHealth -= this.monsterAttacks();
    },
    run: function() {
      this.gameIsRunning = false;
    },
    calculateDamage: function(min, max) {
      return Math.max(min, Math.ceil(Math.random() * max));
    },
    monsterAttacks: function() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `The monster hit you for ${damage} damage!`
      });
      return damage;
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('Victory! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('Defeat! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  }
});
