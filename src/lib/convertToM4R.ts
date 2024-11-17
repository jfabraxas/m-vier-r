import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as path from 'path';

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

/**
 * Converts an audio file to the .m4r format.
 * @param inputFilePath - The path to the input audio file.
 * @param outputFilePath - The path to the output .m4r file.
 * @returns A promise that resolves when the conversion is complete.
 */
function convertToM4R(inputFilePath: string, outputFilePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .toFormat('m4r')
            .on('end', () => {
                console.log('Conversion finished!');
                resolve();
            })
            .on('error', (err:string) => {
                console.error('Error: ', err);
                reject(err);    
            })
            .save(outputFilePath);
    });
}

// Example usage
const inputFile = path.join(__dirname, 'input.mp3');
const outputFile = path.join(__dirname, 'output.m4r');

convertToM4R(inputFile, outputFile)
    .then(() => console.log('Conversion successful'))
    .catch((err) => console.error('Conversion failed:', err));
