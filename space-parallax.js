
const canvas = document.getElementById("space-parallax")
const ctx = canvas.getContext("2d")
const navbar = document.querySelector(".navbar")

let stars = []
let scrollY = 0

const STAR_COUNT = 250
const SCROLL_SCALE = 0.5
const MIN_BLINK_DELAY = 20000;
const MAX_BLINK_DELAY = 30000;
