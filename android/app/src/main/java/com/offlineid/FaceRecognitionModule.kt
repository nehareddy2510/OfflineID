package com.offlineid

import android.graphics.BitmapFactory
import com.facebook.react.bridge.*
import com.offlineid.model.FaceNetModel
import com.offlineid.model.Models
import android.util.Log
class FaceRecognitionModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  private var faceNetModel: FaceNetModel? = null

private fun getFaceNetModel(): FaceNetModel {

    if (faceNetModel == null) {

        faceNetModel = FaceNetModel(
            reactApplicationContext,
            Models.FACENET,
            false,
            true
        )

    }

    return faceNetModel!!

}

    override fun getName(): String {
        return "FaceRecognition"
    }

    @ReactMethod
    fun getEmbedding(
        imagePath: String,
        promise: Promise
    ) {

        try {

            val bitmap =
                BitmapFactory.decodeFile(
                    imagePath
                )

            if (bitmap == null) {

                promise.reject(
                    "BITMAP_ERROR",
                    "Unable to decode image."
                )

                return
            }

       val embedding =
    getFaceNetModel().getFaceEmbedding(
        bitmap
    )

            val array =
                Arguments.createArray()

      for (value in embedding) {

    array.pushDouble(
        value.toDouble()
    )

}
Log.d(
    "FaceRecognition",
    "Embedding Size = ${embedding.size}"
)

Log.d(
    "FaceRecognition",
    embedding.joinToString(",")
)

            promise.resolve(
                array
            )

        }

        catch(e:Exception){

            promise.reject(
                "FACENET_ERROR",
                e
            )

        }

    }

}

