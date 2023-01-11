// import { createMovingPlatform } from './movingPlatform'
// import { createTriggeredPlatform } from './triggeredPlatform'
// import { createPathedPlatform } from './pathedPlatform'
// import * as utils from '@dcl/ecs-scene-utils'
// import { createCoin } from './coin'
import { getUserData } from "@decentraland/Identity";
import resources from "./resources";


// Base
const base = new Entity()
base.addComponent(new GLTFShape('models/scene/ANZ_ENV_4.glb'))
base.addComponent(new Transform( {
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 90),
  scale: new Vector3(0.23, 0.23, 0.23),
}))
engine.addEntity(base)

let userId = '';

executeTask(async () => {
  let myPlayer = await getUserData()
  userId = myPlayer?.userId;
  fetchDataFromURLGet();

});



const adobeLogoEntity = new Entity();
adobeLogoEntity.addComponent(new GLTFShape("models/logo/Adobe_logo3D.glb"));
adobeLogoEntity.addComponent(
  new Transform({
    position: new Vector3(11, 0.6, 2),
    scale: new Vector3(8, 8, 3),
  })
);
engine.addEntity(adobeLogoEntity);


const sunLogo = new Entity();
sunLogo.addComponent(new GLTFShape("models/logo/ANZ_logo3D.glb"));
sunLogo.addComponent(
  new Transform({
    position: new Vector3(8, 0.1, 8),
    scale: new Vector3(4, 4, 3),
  })
);
engine.addEntity(sunLogo);


// // Static platform
// const staticPlatform = new Entity()
// staticPlatform.addComponent(new GLTFShape('models/staticPlatforms.glb'))
// staticPlatform.addComponent(new Transform())
// engine.addEntity(staticPlatform)




let sphere = new BoxShape();
const sphereEntity = new Entity();

sphereEntity.addComponent(sphere);
sphereEntity.addComponent(
  new OnPointerDown((e) => {
    log("Enter SphereShape : ");
    isLinkClicked = true;
    postData();
    openExternalURL("http://ec2-3-249-23-215.eu-west-1.compute.amazonaws.com:4502/content/anz/us/en/metaverse.html?InterestedInLoan=Yes");
    // openExternalURL("http://localhost:4502/content/anz/us/en/metaverse.html");
  }, {
    hoverText: "Click here to redirect",
  })
);

const myMaterialsphere = new Material();
myMaterialsphere.albedoColor = Color3.Green();

// //Assign same material to all entities
sphereEntity.addComponent(myMaterialsphere);
const sphereTransform = new Transform({ 
  position: new Vector3(5, 1.5, 2),
  rotation: new Quaternion(0, 0, 0, 0),
  scale: new Vector3(0.5, 0.5, 0.5),
 });
sphereEntity.addComponent(sphereTransform);
engine.addEntity(sphereEntity);


async function postData() {
  let url = "https://dcs.adobedc.net/collection/51789f127e52bb6c7d78111e049e20ace431d58ae872b621150327fcd1906922";
  let payloadBody = {
    header: {
      schemaRef: {
        id: "https://ns.adobe.com/aepgdcdevenablement2/schemas/7d880ce35afffc2f57c4aa72efce42b381ecad0dca83ec62",
        contentType: "application/vnd.adobe.xed-full+json;version=1.0",
      },
      imsOrgId: "AAE25B8C5D0335630A495C96@AdobeOrg",
      datasetId: "62d7d9a17996a41c07cf0028",
      source: {
        name: "Streaming dataflow - 08/04/2022 10:19 AM",
      },
    },
    body: {
      xdmMeta: {
        schemaRef: {
          id: "https://ns.adobe.com/aepgdcdevenablement2/schemas/7d880ce35afffc2f57c4aa72efce42b381ecad0dca83ec62",
          contentType: "application/vnd.adobe.xed-full+json;version=1.0",
        },
      },
      xdmEntity: {
        _aepgdcdevenablement2: {
          chatting: "Sample value",
          linkClick: isLinkClicked.toString(),
          userId: userId,
          watchedVideos: isVideoPlayed.toString(),
        },
        _id: "/uri-reference",
        eventMergeId: "Sample value",
        eventType: "advertising.completes",
        identityMap: {
          key: [
            {
              authenticatedState: "ambiguous",
              id: "Sample value",
              primary: false,
            },
          ],
        },
        producedBy: "self",
        timestamp: "2018-11-12T20:20:39+00:00",
      },
    },
  };
  try {
    const options = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'sandbox-name': 'dev',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2NTk1ODg1MDA4MzNfZjcxYWM2YmUtOWI1Mi00YTQ2LWJiNDQtNWRhMmNiMjY2YjI2X3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJleGNfYXBwIiwidXNlcl9pZCI6IkM5MkIwNDUwNjJEREFEOEQwQTQ5NUMzQUBiOTEzNTI3NjYyZGQyMzczNDk1ZTRhLmUiLCJzdGF0ZSI6IntcInNlc3Npb25cIjpcImh0dHBzOi8vaW1zLW5hMS5hZG9iZWxvZ2luLmNvbS9pbXMvc2Vzc2lvbi92MS9ORGMyWkdZMk4ySXRaR0kzWWkwME5UazJMV0pqWVdRdE5qZ3pNams0TjJRMk9UQmlMUzFET1RKQ01EUTFNRFl5UkVSQlJEaEVNRUUwT1RWRE0wRkFZamt4TXpVeU56WTJNbVJrTWpNM016UTVOV1UwWVM1bFwifSIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiNjY1RTQ2NzA2MjlGMEQ2MzBBNDk1RTc2QEFkb2JlSUQiLCJjdHAiOjAsImZnIjoiV1ZHUUFORERYUEU3SUhXT0dPUUZTN1FBVDQ9PT09PT0iLCJzaWQiOiIxNjU4ODM4NDgwNTU1XzNhYjdmYjU0LThhM2EtNGVjZS1iZTc1LWZkM2UyMTlhM2I0NF91ZTEiLCJtb2kiOiIxMzA5Zjg0ZiIsInBiYSI6IiIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWIubWFuYWdlLGFkZGl0aW9uYWxfaW5mby5qb2JfZnVuY3Rpb24sYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0LGFkZGl0aW9uYWxfaW5mby5yb2xlcyxhZGRpdGlvbmFsX2luZm8sQWRvYmVJRCxhZG9iZWlvX2FwaSxhZG9iZWlvLmFwcHJlZ2lzdHJ5LnJlYWQsYXVkaWVuY2VtYW5hZ2VyX2FwaSxjcmVhdGl2ZV9jbG91ZCxtcHMsb3BlbmlkLHJlYWRfb3JnYW5pemF0aW9ucyxyZWFkX3BjLmFjcCxyZWFkX3BjLmRtYV90YXJ0YW4scmVhZF9wYyxzZXNzaW9uIiwiY3JlYXRlZF9hdCI6IjE2NTk1ODg1MDA4MzMifQ.drbuVtxpZMxHJvsvd9NiupSzGY31wSFYoYMg1nCP-4QeMP6p-bzcK--FWQTpFGNNX8hLeTrk2_8zRu_W20ro8GWmlvsUAwyYE6ck4PGKfbclVApn8GWrJXFKCkNqfyZFV-GTNWWH8TQIUdPu0du5MNzv6kr92xtiCPwuAQ5xUk0u_Qvg4DccG1wgiQ80dm6w26Zl2CWEUgHukDeGKFZuECNVOdfzYEkT2y82RCFXamn8JSN0qTw4QyEsY_mZr1jwT9Ri8RJZ41wwO0BT7QXVmGp6Gz9SCfQ9Bhee-vwRtpLt8Rmy8fI67vqxrlzHU_dw-nvo7a2mvpKGw-A1ImDh7w',
      },
      body: JSON.stringify(payloadBody),
    };
    let response = await fetch(url, options);
    log("full response raw url: ", response);
        // let json = await response.json();

  } catch {
    log("an error occurred while reaching for player data");
  }
}

async function fetchDataFromURLGet() {
  // let url = 'https://webhook.site/2679b87a-a6d4-4d82-a9e7-07dca965d0eb';
  let url = "https://webhook.site/378902b7-93b6-48b1-834b-5d7c11c45e65";
  try {
    const options = {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    let response = await fetch(url, options);
    let json = await response.json();
    log(json);
    if (json.messages[0]._aepgdcdevenablement2.Occupation) {
      log(json.messages[0]._aepgdcdevenablement2.Occupation);
      let userOccupation = json.messages[0]._aepgdcdevenablement2.Occupation;
      LoadVideo(userOccupation);
    }
    log("full response raw url Get: ", JSON.stringify(json));
    return JSON.stringify(json);
  } catch {
    log("an error occurred while reaching for player data");
  }
}

let isVideoPlayed: boolean = false;
let isLinkClicked: boolean = false;

function LoadVideo( purpose: string ) {

  log( "from get api : " + purpose);

  const myVideoClip = resources.video[purpose]
  
  // #2
  const myVideoTexture = new VideoTexture(myVideoClip);
  
  // #3
  const myMaterial = new Material();
  myMaterial.albedoTexture = myVideoTexture;
  myMaterial.roughness = 1;
  myMaterial.specularIntensity = 0;
  myMaterial.metallic = 0;
  myMaterial.emissiveIntensity = 0.6;
  
  // #4
  const screen = new Entity();
  let planeScreen = new PlaneShape();
  planeScreen.width = 15;
  planeScreen.height = 2;
  screen.addComponent(planeScreen);
  screen.addComponent(
    new Transform({
      position: new Vector3(8, 1.5, 2),
      rotation: new Quaternion(0, 0, 0, 0),
      scale: new Vector3(4, 2, 1),
    })
  );
  
  screen.addComponent(myMaterial);
  
  screen.addComponent(
    new OnPointerDown((e) => {
      log("Event called : " + e);
      log("screen hieght : " + screen.getComponent(PlaneShape).height);
      log("screen  : " + screen.getComponent(PlaneShape).width);
      // fetchDataFromURLGet();
  
      if (myVideoTexture.playing) {
        isVideoPlayed = true;
        myVideoTexture.play();
      } else {
        myVideoTexture.pause();
      }
      myVideoTexture.playing = !myVideoTexture.playing;
    })
  );
  engine.addEntity(screen);
  
}
