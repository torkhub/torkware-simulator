import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://localhost:1883')
let g_speed = 0;
let tps = 0;
let i_acc = 0.0;
let accDirection = 0.1; // Adjust the increment rate as needed

client.on('connect', function () {
    console.log('Connected to MQTT Broker');
    const topic = 'local/telemetry';

    setInterval(() => {
        // Increment g_speed up to 150
        if (g_speed < 150) {
            g_speed += 1;
        }

        // Reset tps to 0 if it reaches 100, otherwise increment (Assumption, adjust as needed)
        tps = (tps >= 100) ? 0 : tps + 1;

        // Adjust i_acc within the bounds of -2 and +2
        i_acc += accDirection;
        if (i_acc <= -2 || i_acc >= 2) {
            accDirection *= -1;
        }

        // Construct and publish message
        const message = JSON.stringify({
            g_speed,
            tps,
            i_acc: i_acc,
            time: Date.now()
        });

        client.publish(topic, message, function (err) {
            if (!err) {
                console.log(`Message sent: ${message}`);
            } else {
                console.error('Failed to send message', err);
            }
        });
    }, 500); // Adjust timing as necessary
});