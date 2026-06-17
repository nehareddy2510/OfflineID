package com.offlineid

import com.facebook.react.bridge.*
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.face.FaceDetection
import com.google.mlkit.vision.face.FaceDetectorOptions
import java.io.File

class FaceDetectionModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "FaceDetection"
    }

    @ReactMethod
    fun detect(
        imagePath: String,
        promise: Promise
    ) {

        val image =
            InputImage.fromFilePath(
                reactApplicationContext,
                android.net.Uri.fromFile(File(imagePath))
            )

       val options =
    FaceDetectorOptions.Builder()

        .setPerformanceMode(
            FaceDetectorOptions.PERFORMANCE_MODE_ACCURATE
        )

        .enableTracking()

        .setClassificationMode(
            FaceDetectorOptions.CLASSIFICATION_MODE_ALL
        )

        .build()

        val detector =
            FaceDetection.getClient(options)

        detector.process(image)
            .addOnSuccessListener { faces ->

                val map = Arguments.createMap()

                map.putInt(
    "faceCount",
    faces.size
)

if (faces.isNotEmpty()) {

    val face = faces[0]

    map.putDouble(
        "headY",
        face.headEulerAngleY.toDouble()
    )

    map.putDouble(
        "headZ",
        face.headEulerAngleZ.toDouble()
    )

    map.putDouble(
        "leftEye",
        face.leftEyeOpenProbability?.toDouble()
            ?: -1.0
    )

    map.putDouble(
        "rightEye",
        face.rightEyeOpenProbability?.toDouble()
            ?: -1.0
    )

}

                promise.resolve(map)
            }

            .addOnFailureListener {

                promise.reject(
                    "FACE_ERROR",
                    it.message
                )

            }

    }
}