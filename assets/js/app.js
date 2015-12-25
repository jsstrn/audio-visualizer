const audio = document.querySelector('audio')
const audioContext = new (window.AudioContext || window.webkitAudioContext)
const audioSource = audioContext.createMediaElementSource(audio)
const analyser = audioContext.createAnalyser()
let frequencyData = new Uint8Array(200)

audioSource.connect(analyser)
audioSource.connect(audioContext.destination)

const height = window.screen.height / 3
const width = window.screen.width - 200
const bar = '1'
const visualizer = d3.select('#visualizer')
  .append('svg')
  .attr('height', height)
  .attr('width', width)

visualizer.selectAll('rect')
  .data(frequencyData)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * (width / frequencyData.length))
  .attr('width', width / frequencyData.length - bar)

function updateVisualizer () {
  window.requestAnimationFrame(updateVisualizer)
  analyser.getByteFrequencyData(frequencyData)

  visualizer.selectAll('rect')
   .data(frequencyData)
   .attr('y', d => height - d)
   .attr('height', d => d)
   .attr('fill', d => `rgb(${d}, ${d - 100}, ${d - 50})`)
}

updateVisualizer()
