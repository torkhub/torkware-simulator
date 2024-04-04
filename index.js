import mqtt from 'mqtt'

const args = process.argv.slice(2); // This removes the first two elements

const client = mqtt.connect('mqtt://localhost:1883')
let gps_speed = 0;
let tps = 0;
let i_acc = 0.0;
let accDirection = 0.1; // Adjust the increment rate as needed
let DELAY = args[0];

client.on('connect', function () {
    console.log('Connected to MQTT Broker');
    const topic = 'local/telemetry';

    setInterval(() => {
        if (gps_speed < 150) {
            gps_speed += 1;
        }

        tps = (tps >= 100) ? 0 : tps + 1;

        // Adjust i_acc within the bounds of -2 and +2
        i_acc += accDirection;
        if (i_acc <= -2 || i_acc >= 2) {
            accDirection *= -1;
        }

        // Construct and publish message
        const message = JSON.stringify({
            gps_speed,
            tps,
            inline_acc: parseFloat(i_acc.toFixed(2)),
            time: Date.now()
        });

        client.publish(topic, message, function (err) {
            if (!err) {
                console.log(`Message sent: ${message}`);
            } else {
                console.error('Failed to send message', err);
            }
        });
    }, DELAY);
});