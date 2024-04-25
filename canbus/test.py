import can

# Configure the channel and bitrate
bus = can.interface.Bus(bustype='socketcan', channel='can0', bitrate=500000)

# Create a new CAN message
msg = can.Message(arbitration_id=0x123, data=[0x11, 0x22, 0x33], is_extended_id=False)

# Send the message
try:
    bus.send(msg)
    print("Message sent on the bus!")
except can.CanError:
    print("Message NOT sent")
