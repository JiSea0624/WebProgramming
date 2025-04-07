// Audio files
const samples = {
    sample1: './Sounds/AHA! - Alan Partridge.mp3',
    sample2: './Sounds/alan_partridge_dan.mp3',
    sample3: './Sounds/Back of the net (Alan Partridge).mp3',
    sample4: './Sounds/bang-out-of-order-101soundboards.mp3',
    sample5: './Sounds/jurassic-park_7taJyLt.mp3',
    sample6: './Sounds/smell-my-cheese-101soundboards.mp3',
    sample7: './Sounds/goal-101soundboards.mp3',
    sample8: './Sounds/kiss-my-face2-101soundboards.mp3',
    sample9: './Sounds/hello-partridge-101soundboards.mp3',
};

// Checks if an audio is playing
let currentlyPlaying = null;

// For the audio to play 
function playSample(sample) {
    // Check if there is already audio playing and if it hasn't ended
    if (currentlyPlaying && !currentlyPlaying.ended) {
        console.log('Audio is already playing. Wait for it to finish.');
        return; // Prevent starting a new audio if one is already playing
    }

    // Create a new audio object using the sample's file path
    const audio = new Audio(samples[sample]);
    currentlyPlaying = audio;

    console.log(`Playing sample: ${sample}`);
    audio.play().catch((error) => {
        // Handle errors during audio playback
        console.error('Audio playback failed:', error);
    });

    // Add an event listener to reset `currentlyPlaying` when the audio ends
    audio.addEventListener('ended', () => {
        currentlyPlaying = null; // Reset when the audio finishes
    });
}

// Add event listeners to all elements with the class "border"
document.querySelectorAll('.border').forEach(border => {
    border.addEventListener('mouseover', function () {
        const sampleId = this.getAttribute('data-sample');
        console.log(`Hovered element has data-sample: ${sampleId}`); // Debug log
        if (samples[sampleId]) { // Ensure the sampleId exists in the samples object
            playSample(sampleId);
        } else {
            console.warn(`Sample ID "${sampleId}" not found in samples.`);
        }
    });
});
