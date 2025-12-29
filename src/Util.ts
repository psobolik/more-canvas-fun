export default {
    // Returns a random number between min and max, inclusive of both endpoints
    random: (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}