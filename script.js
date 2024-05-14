import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// canvas
const canvas = document.querySelector("#myCanvas");
// scene
const scene = new THREE.Scene();
// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
// resize
window.addEventListener("resize", function(){
sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
});
// models
let model = null;
// loaders
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "./model/free_porsche_911_carrera_4s/scene.gltf",
  (gltf) => {
    model = gltf.scene;
    scene.add(model);
  }
);


// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(5, 0, 1);
scene.add(camera);
// mesh
// controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// light

const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1,0);
scene.add(directionalLight);
const Light1 = new THREE.PointLight(0x4c4c4c,10);
 Light1.position.set(0,300,500);
scene.add(Light1);
const Light2 = new THREE.PointLight(0x4c4c4c,10);
 Light2.position.set(500,100,0);
scene.add(Light2);
const Light3 = new THREE.PointLight(0x4c4c4c,10);
 Light3.position.set(0,100,-500);
scene.add(Light3);
const Light4 = new THREE.PointLight(0x4c4c4c,10);
 Light4.position.set(-500,100,500);
scene.add(Light4);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
});
// document.querySelector("#myCanvas").appendChild(renderer.domElement);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// animator
const tick = () =>{
    window.requestAnimationFrame(tick);
    renderer.render(scene, camera);
    controls.update();
 TWEEN.update();
}

tick();
// camera animation 
function runcamera(x,y,z){
    let targetPosition = new THREE.Vector3(x,y,z);
    let duration = 1200;
    
    let tween = new TWEEN.Tween(camera.position)
    .to( targetPosition, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() =>{
        camera.lookAt(scene.position);
        // renderer.render(scene, camera);
    });
    
    tween.start();
    }
// frontend javascript

const btn = document.querySelector(".more");
const contentOne = document.querySelector(".contentOne");
const contentTwo = document.querySelector(".contentTwo");
let statusContent = "contentOne"
btn.onclick = () =>{
   switch(statusContent){
case "contentOne" :
    runcamera(2,3,1);
    contentTwo.classList.add("contentSpecial");
    contentOne.classList.remove("contentSpecial");
    canvas.style.pointerEvents = "none";
    statusContent = "contentTwo";
    break;
    case "contentTwo" :
    runcamera(3,0,1);
        contentTwo.classList.remove("contentSpecial");
        contentOne.classList.add("contentSpecial");
        canvas.style.pointerEvents = "none";
        statusContent = "fullscreen";
        break;
        case "fullscreen" :
            runcamera(5,0,1);
            contentTwo.classList.add("contentSpecial");
            contentOne.classList.add("contentSpecial");
            canvas.style.pointerEvents = "all";

            statusContent = "contentOne";
            break;
        default :
        break;
   }
}

