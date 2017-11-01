(function () {

	// Preferences
	const SHOW_INPUTS = false
	const FRAMERATE = 30
	const PRECISION = 3
	const SCALE = 1
	// Set sizes
	const WIDTH = document.body.clientWidth / 2 * SCALE
	const HEIGHT = document.body.clientHeight * SCALE
	const SIZE = (WIDTH <= HEIGHT) ? WIDTH : HEIGHT
	const RADIUS = SIZE / 2
	// Autoplay
	let AUTO = true

	const main = new p5(function (sketch) {

		let canvas
		let vector
		let degreeSlider
		let degree = 0
		//let paras = {}
		let trig = { sin: 0, cos: 0, tan: 0, ctg: 0 }

		sketch.setup = function () {
			// Basic setup
			sketch.frameRate(FRAMERATE)
			sketch.angleMode(sketch.DEGREES)
			canvas = sketch.createCanvas(SIZE, SIZE)
			// Angle slider
			degreeSlider = sketch.createSlider(0, 359, 0, 1)
			degreeSlider.changed(function () {
				// Get angle
				degree = degreeSlider.value()
				// Update with new angle
				sketch.angleChanged(degree)
			})
			degreeSlider.mouseWheel(function (event) {
				event.preventDefault()
				// Get scroll delta
				let delta = event.deltaY / 100
				// Get angle
				degree -= delta
				sketch.angleChanged(degree)
				// Update with new angle
				degreeSlider.value(degree)
			})
			if (!SHOW_INPUTS) {
				degreeSlider.hide()
			}
			// Scroll over canvas
			canvas.mouseWheel(function (event) {
				event.preventDefault()
				/* let x = window.scrollX
				let y = window.scrollY
				console.log(x, y)
				window.scrollTo(x, y) */
				// Get scroll delta
				degree += event.deltaY / 100
				// Set new angle
				sketch.angleChanged(degree)
				// Update slider value
				degree = degreeSlider.value()
			})
			// Output paragraphs
			/* paras = {
				degree: createP(''),
				sin: createP(''),
				cos: createP(''),
				tan: createP(''),
				ctg: createP('')
			} */
			sketch.angleChanged(0)
		}

		sketch.draw = function () {
			if (AUTO) {
				if (degree >= 360) degree = 0
				degree++
				sketch.angleChanged(degree)
			}
			// Translate by size/2 to center (0,0) origin
			sketch.translate(SIZE / 2, SIZE / 2)
			// Base / background
			sketch.background(250)
			sketch.drawGrid()
			sketch.noFill()
			// Circle
			sketch.strokeWeight(2)
			sketch.stroke(0)
			sketch.ellipse(0, 0, RADIUS)
			// Vector with angle
			sketch.strokeWeight(3)
			sketch.stroke(50, 50, 200)
			sketch.line(0, 0, vector.x, vector.y)
			// Guides
			sketch.strokeWeight(0.8)
			sketch.textSize(20)
			// degree
			sketch.stroke(50, 50, 200)
			sketch.fill(50, 50, 200)
			sketch.text(degree + '°', 0 + 10, 0 + 20)
			// sin
			sketch.stroke(100)
			sketch.fill(0)
			sketch.line((-SIZE / 2), (-trig.sin * RADIUS / 2), (SIZE / 2), (-trig.sin * RADIUS / 2))
			sketch.text('sin', (SIZE / 2) - 60, (-trig.sin * RADIUS / 2) - 10)
			sketch.fill(200, 50, 50)
			sketch.stroke(200, 50, 50)
			sketch.text(trig.sin, (SIZE / 2) - 60, (-trig.sin * RADIUS / 2) + 20)
			// cos
			sketch.fill(50, 200, 50)
			sketch.stroke(50, 200, 50)
			sketch.text(trig.cos, (trig.cos * RADIUS / 2) + 10, (-SIZE / 2) + 20)
			sketch.stroke(100)
			sketch.fill(0)
			sketch.line((trig.cos * RADIUS / 2), (-SIZE / 2), (trig.cos * RADIUS / 2), (SIZE / 2))
			sketch.text('cos', (trig.cos * RADIUS / 2) - 40, (-SIZE / 2) + 20)
			sketch.textSize(12)
			sketch.noFill()

		}

		sketch.mouseClicked = function () {
			AUTO = !AUTO
		}

		sketch.angleChanged = function (degree) {
			// Create vector rotated by the angle
			const BASE = sketch.createVector(RADIUS / 2, 0)
			vector = BASE.rotate(-degree)
			// Trigonometry
			trig.sin = sketch.sin(degree).toFixed(PRECISION)
			trig.cos = sketch.cos(degree).toFixed(PRECISION)
			trig.tan = sketch.tan(degree).toFixed(PRECISION)
			trig.ctg = (1 / sketch.tan(degree)).toFixed(PRECISION)
			// Display outoput
			/* paras.degree.html('degree:' + degree)
			paras.sin.html('sin:' + trig.sin)
			paras.cos.html('cos:' + trig.cos)
			paras.tan.html('tan:' + trig.tan)
			paras.ctg.html('ctg:' + trig.ctg) */
			side.setDegree(degree)
		}

		sketch.drawGrid = function () {
			sketch.strokeWeight(1)
			sketch.stroke(230)
			sketch.fill(120)
			for (var x = -sketch.width; x < sketch.width; x += 20) {
				sketch.line(x, -sketch.height, x, sketch.height)
				//text(x, x + 1, 12)
			}
			for (var y = -sketch.height; y < sketch.height; y += 20) {
				sketch.line(-sketch.width, y, sketch.width, y)
				//text(y, 1, y + 12)
			}
			// Axis
			sketch.stroke(150)
			sketch.strokeWeight(2)
			sketch.line(0, -SIZE / 2, 0, SIZE / 2)
			sketch.line(-SIZE / 2, 0, SIZE / 2, 0)
			// Axis labels
			sketch.text('x', (SIZE / 2) - 30, -10)
			sketch.text('y', +10, (-SIZE / 2) + 30)
			// Unit of 1 (radius)
			sketch.strokeWeight(5)
			sketch.line(-RADIUS / 2, -5, -RADIUS / 2, 5)
			sketch.line(RADIUS / 2, -5, RADIUS / 2, 5)
			sketch.line(-5, -RADIUS / 2, 5, -RADIUS / 2)
			sketch.line(-5, RADIUS / 2, 5, RADIUS / 2)
			// Unit labels
			sketch.strokeWeight(2)
			sketch.text('0', 0 - 12, 0 + 15)
			sketch.text('1', (-RADIUS / 2) - 15, 15)
			sketch.text('1', (RADIUS / 2) + 10, 15)
			sketch.text('1', +10, (-RADIUS / 2) - 10)
			sketch.text('1', +10, (RADIUS / 2) + 15)
		}

		/* function pixelArray() {
			loadPixels()
			let arr = []
			for (var x = 0; x < width; x++) {
				arr[x] = []
				for (var y = 0; y < height; y++) {
					let index = (x + y * width) * 4
					arr[x][y] = [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]]
				}
			}
			return arr;
		}
		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				if (dist(CENTER.x, CENTER.y, x, y) < RADIUS) {
					stroke(0, 100, 100)
					point(x, y)
				}
			}
		} */

	})

	const side = new p5(function (sketch) {

		let canvas
		let trig = { sin: [], cos: [] }

		sketch.setDegree = function (degree) {
			// Add new point
			trig.sin.unshift(sketch.sin(degree).toFixed(PRECISION))
			trig.cos.unshift(sketch.cos(degree).toFixed(PRECISION))
			// Keep array length
			if (trig.sin.length > WIDTH) {
				trig.sin.pop()
				trig.cos.pop()
			}
		}

		sketch.setup = function () {
			// Basic setup
			sketch.frameRate(FRAMERATE)
			sketch.angleMode(sketch.DEGREES)
			canvas = sketch.createCanvas(SIZE, SIZE)
		}

		sketch.draw = function () {
			// Translate by size/2 to center (0,0) origin
			sketch.translate(1, SIZE / 2)
			// Base / background
			sketch.background(250)
			sketch.drawGrid()
			sketch.noFill()

			for (var i = 0; i < trig.sin.length; i++) {
				sketch.strokeWeight(3)
				sketch.fill(0)
				// sin
				sketch.stroke(200, 50, 50)
				sketch.point(i, -trig.sin[i] * RADIUS / 2)
				// cos
				sketch.stroke(50, 200, 50)
				sketch.point(i, -trig.cos[i] * RADIUS / 2)

				// Units of PI
				sketch.strokeWeight(1)
				sketch.stroke(150)
				sketch.fill(120)
				if (trig.sin[i] == 1 && trig.cos[i] == 0) {
					sketch.line(i, -trig.sin[i] + 10, i, -trig.sin[i] - 10)
					sketch.text('k × π / 2', i - 10, -trig.sin[i] + 30)
				}
				if (trig.sin[i] == 0 && trig.cos[i] == 1) {
					sketch.line(i, -trig.sin[i] + 10, i, -trig.sin[i] - 10)
					sketch.text('k × π', i - 10, -trig.sin[i] + 30)
				}
				if (trig.sin[i] == -1 && trig.cos[i] == 0) {
					sketch.line(i, -trig.sin[i] + 10, i, -trig.sin[i] - 10)
					sketch.text('k × 3π / 2', i - 10, -trig.sin[i] + 30)
				}
				if (trig.sin[i] == 0 && trig.cos[i] == -1) {
					sketch.line(i, -trig.sin[i] + 10, i, -trig.sin[i] - 10)
					sketch.text('k × 2π', i - 10, -trig.sin[i] + 30)
				}

			}
			//sketch.line(0, (-trig.sin * RADIUS / 2), (SIZE), (-trig.sin * RADIUS / 2))

			sketch.textSize(16)
			sketch.text('k ϵ ℝ', (WIDTH / 2) - 50, (HEIGHT / 2) - 50)
			sketch.textSize(12)
		}

		sketch.drawGrid = function () {
			sketch.strokeWeight(1)
			sketch.stroke(230)
			sketch.fill(120)
			for (var x = -sketch.width; x < sketch.width; x += 20) {
				sketch.line(x, -sketch.height, x, sketch.height)
				//text(x, x + 1, 12)
			}
			for (var y = -sketch.height; y < sketch.height; y += 20) {
				sketch.line(-sketch.width, y, sketch.width, y)
				//text(y, 1, y + 12)
			}
			// Axis
			sketch.stroke(150)
			sketch.strokeWeight(2)
			sketch.line(0, -SIZE / 2, 0, SIZE / 2)
			sketch.line(0, 0, SIZE, 0)
			// Axis labels
			sketch.text('x', (SIZE) - 30, -10)
			sketch.text('y', +10, (-SIZE / 2) + 30)
			/* // Unit of PI
			sketch.strokeWeight(5)
			sketch.line(RADIUS / 2, -5, RADIUS / 2, 5)
			sketch.line(RADIUS, -5, RADIUS, 5)
			sketch.line(RADIUS * 1.5, -5, RADIUS * 1.5, 5)
			sketch.line((RADIUS * 2) - 3, -5, (RADIUS * 2) - 3, 5) */
			sketch.line(-5, -RADIUS / 2, 5, -RADIUS / 2)
			sketch.line(-5, RADIUS / 2, 5, RADIUS / 2)
			/*// Unit labels
			sketch.strokeWeight(2)
			sketch.text('0', 0 - 12, 0 + 15)
			sketch.text('PI / 2', (RADIUS / 2) - 15, 25)
			sketch.text('PI', (RADIUS) - 5, 25)
			sketch.text('3 PI / 2', (RADIUS * 1.5) - 20, 25)
			sketch.text('2 PI', (RADIUS * 2) - 25, 25) */
			sketch.text('1', +10, (-RADIUS / 2) - 10)
			sketch.text('1', +10, (RADIUS / 2) + 15)
		}

	})

})()
