import tensorflow as tf

interpreter = tf.lite.Interpreter(
    model_path="android/app/src/main/assets/models/facenet.tflite"
)

interpreter.allocate_tensors()

print(interpreter.get_input_details())
print(interpreter.get_output_details())