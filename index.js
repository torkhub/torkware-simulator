import mqtt from 'mqtt'
const client = mqtt.connect('mqtt://localhost:1883')
let g_speed = 0;
let tps = 0;
let i_acc = 0.0;

client.on('connect', function () {
    console.log('Connected to MQTT Broker')
    const topic = 'local/telemetry'
    setInterval(() => {
        g_speed += 1;
        tps += 1;
        i_acc += accDirection;
        if (i_acc <= -2 || i_acc >= 2) accDirection *= -1;

        const message = JSON.stringify({
            g_speed,
            tps,
            i_acc: parseFloat(i_acc.toFixed(2)),
            time: Date.now()
        });

        client.publish(topic, message, function (err) {
            if (!err) {
                console.log(`Message sent: ${message}`)
            } else {
                console.error('Failed to send message', err)
            }
        })
    }, 900)
});
