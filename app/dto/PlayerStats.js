export default class PlayerStats {
  constructor({
    wins, losses, goalsScored, goalsConceded,
  }) {
    this.wins = wins;
    this.losses = losses;
    this.goalsScored = goalsScored;
    this.goalsConceded = goalsConceded;
  }
}
