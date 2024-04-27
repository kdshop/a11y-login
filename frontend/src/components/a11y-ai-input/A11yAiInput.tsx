import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as CocoSSD from "@tensorflow-models/coco-ssd";
import { ObjectDetection } from "@tensorflow-models/coco-ssd";

export const A11yAiInput: FC = () => {
  const [model, setModel] = useState<ObjectDetection>(null);
  const [detection, setDetection] = useState<ObjectDetection>(null);
  const htmlVideoElement = useRef<HTMLVideoElement>();
  useEffect(() => {
    async function loadModel() {
      // const img = document.getElementById("img");

      // Load the model.
      const model = await CocoSSD.load();

      // Classify the image.
      // const predictions = await model.detect(img);

      setModel(model);
    }

    loadModel();
  }, []);

  function loadCamera(element: HTMLVideoElement) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        console.log(stream, { ...htmlVideoElement.current });
        element.srcObject = stream;
        element.addEventListener("loadeddata", (asd) => {
          element.play();
          console.log(asd);
          console.log("loaded");
        });
      });
  }
  // return model ? (
  //   <div className="absolute bottom-0 w-60 h-96 rounded-xl bg-white z-20">
  //     "Model loaded"
  //     <video
  //       ref={(elelement) => console.log(elelement?.srcObject)}
  //       id="video"
  //       autoPlay
  //       muted
  //       width="640"
  //       height="480"
  //     ></video>
  //   </div>
  // ) : (
  //   <p>Loading...</p>
  // );

  function streamCamVideo() {
    var constraints = { audio: true, video: { width: 1280, height: 720 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = document.querySelector("video");

        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
  }

  const detectObject = () => {
    console.log(
      model
        .detect(document.querySelector("video"))
        .then((detectObject) =>
          setDetection(
            detectObject.map(
              ({ class: clss, score }) =>
                JSON.stringify({ clss, score }) + "\n",
            ),
          ),
        ),
    );
  };

  return (
    <div className="absolute bottom-0 w-60 h-96 rounded-xl bg-white z-20">
      <video autoPlay muted id="videoElement" controls></video>

      <br />
      <button
        className="bg-white rounded-xl border-2 p-2 border-orange-500"
        onClick={streamCamVideo}
      >
        Start camera
      </button>
      <br />
      <button
        className="bg-white rounded-xl border-2 p-2 border-violet-500"
        onClick={detectObject}
      >
        detect
      </button>
      <pre>{detection}</pre>
    </div>
  );
};
