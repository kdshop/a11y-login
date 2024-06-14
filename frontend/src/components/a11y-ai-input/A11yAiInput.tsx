import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as CocoSSD from "@tensorflow-models/coco-ssd";
import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd";
import classNames from "classnames";
import Papa from "papaparse";
import Draggable from "react-draggable";

import "./A11yAiInput.css";

export const A11yAiInput: FC = () => {
  const [detectedObjects, setDetectedObject] = useState<Set<string>>(new Set());
  const [cameraDetectionEnabled, setCameraDetectionEnabled] = useState(false);
  const [model, setModel] = useState<ObjectDetection>(null);
  const [lastActiveInput, setLastActiveInput] =
    useState<HTMLInputElement | null>(null);
  const addDetectedObjects = useCallback(
    (detectedObjects: string[]) =>
      setDetectedObject((oldSet) => {
        detectedObjects.forEach((object) =>
          oldSet.add(object.replace(new RegExp(" ", "g"), "_")),
        );

        return new Set(oldSet);
      }),
    [setDetectedObject],
  );

  useEffect(() => {
    (async () => setModel(await CocoSSD.load()))();

    return () => setModel(null);
  }, []);

  useEffect(() => {
    const addIfInput = (el: Element) => {
      if (
        el.nodeName === "INPUT" &&
        ["text", "textarea", "password"].includes((el as HTMLInputElement).type)
      ) {
        setLastActiveInput(el as HTMLInputElement);
      }
    };
    const listener = () => {
      addIfInput(document.activeElement);
    };

    window.addEventListener("click", listener);
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("click", listener);
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    let intervalDestructor: number;

    if (cameraDetectionEnabled && model) {
      intervalDestructor = window.setInterval(() => {
        (model as typeof ObjectDetection)
          .detect(document.querySelector("video"))
          .then((detectObject) =>
            addDetectedObjects(
              detectObject.map<DetectedObject>((detection) => detection.class),
            ),
          );
      }, 150);
    }

    return () => window.clearInterval(intervalDestructor);
  }, [cameraDetectionEnabled, model]);

  const setInputValue = useCallback(
    (value: string) => {
      if (lastActiveInput && "value" in lastActiveInput) {
        lastActiveInput.value = lastActiveInput?.value + value;
      }
    },
    [lastActiveInput],
  );

  const streamCamVideo = useCallback(() => {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };
    const video = document.querySelector("video");
    if (cameraDetectionEnabled) {
      setCameraDetectionEnabled(false);
      video.pause();

      return;
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = function () {
          video.play().then(() => setCameraDetectionEnabled(true));
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }, [cameraDetectionEnabled]);

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files[0];
    const fileInput = document.getElementById(
      "a11yaiFileInputElement",
    ) as HTMLInputElement;

    Papa.parse(selectedFile, {
      complete(results) {
        addDetectedObjects(results.data.flat(2).filter(Boolean));
      },
    });

    fileInput.value = "";
  };

  const onImageSelected = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    const imgtag = document.getElementById(
      "a11yaiImageElement",
    ) as HTMLImageElement;
    const imageInput = document.getElementById(
      "a11yaiImageInputElement",
    ) as HTMLInputElement;

    imgtag.title = selectedFile.name;
    reader.onload = (event) => {
      imgtag.src = String(event.target.result);
      addDetectedObjects([
        String(event.target.result).split(",")[1].slice(0, 10),
      ]);
    };
    imgtag.onload = () => {
      (model as typeof ObjectDetection)
        .detect(imgtag)
        .then((detectObject) =>
          addDetectedObjects(
            detectObject.map<DetectedObject>((detection) => detection.class),
          ),
        );

      imageInput.value = "";
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <Draggable handle=".drag-icon">
      <article
        className={classNames("a11yai-widget", {
          "a11yai-widget--loading": !model,
        })}
      >
        <section
          className={classNames("preview-wrapper", {
            "preview-playing": cameraDetectionEnabled,
          })}
        >
          <video
            id="a11yaiVideoElement"
            className="video-element"
            autoPlay
            muted
          />
        </section>
        <section className="buttons-wrapper">
          <i className="drag-icon" role="drag-icon">
            ❖
          </i>
          <h2>A11yAiInput</h2>
          <section className="control-buttons">
            <button
              className="button bg-gray-300 focus:bg-gray-400 text-gray-800 font-bold p-1 text-center rounded"
              onClick={() => setDetectedObject(new Set())}
            >
              Clear phrases
            </button>
            <button
              className="button bg-gray-300 focus:bg-gray-400 text-gray-800 font-bold p-1 text-center rounded"
              onClick={streamCamVideo}
            >
              {cameraDetectionEnabled ? "Stop" : "Start"} camera detection
            </button>

            <input
              id="a11yaiImageInputElement"
              className="file-input"
              type="file"
              onChange={(event) => onImageSelected(event)}
            />
            <label
              role="button"
              className="button button-label bg-gray-300 focus:bg-gray-400 text-gray-800 font-bold p-1 text-center rounded file-input-label"
              htmlFor="a11yaiImageInputElement"
            >
              Load an image
            </label>

            <input
              id="a11yaiFileInputElement"
              className="file-input"
              type="file"
              onChange={(event) => onFileSelected(event)}
            />
            <label
              role="button"
              className="button button-label bg-gray-300 focus:bg-gray-400 text-gray-800 font-bold p-1 text-center rounded file-input-label"
              htmlFor="a11yaiFileInputElement"
            >
              Load a CSV
            </label>

            <img
              className="image"
              alt="Place for render loaded images for AI model"
              id="a11yaiImageElement"
            />
          </section>
        </section>
        {Boolean([...detectedObjects].length) && (
          <section className="phrase-buttons">
            {[...detectedObjects].map((objectName, index) => (
              <button
                key={index}
                className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded"
                onClick={() => setInputValue(objectName)}
              >
                {objectName}
              </button>
            ))}
          </section>
        )}
      </article>
    </Draggable>
  );
};
