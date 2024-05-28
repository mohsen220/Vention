import { ArrowHelper, BoxGeometry, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const posX = document.getElementById('pos_x');
const posY = document.getElementById('pos_y');
const posZ = document.getElementById('pos_z');
const color = document.getElementById('color');
const addSphere = document.getElementById('add_sphere');
const addCube = document.getElementById('add_cube');
const removeLast = document.getElementById('remove_last');
const removeAll = document.getElementById('remove_all');

const options = {
  color: color.value,
  position: {
    x: posX.value,
    y: posX.value,
    z: posX.value
  }
};

window.shapes = [];

posX.addEventListener('change', (event) => {
  options.position.x = event.target.value;
});

posY.addEventListener('change', (event) => {
  options.position.y = event.target.value;
});

posZ.addEventListener('change', (event) => {
  options.position.z = event.target.value;
});

color.addEventListener('change', (event) => {
  options.color = event.target.value;
});

addSphere.addEventListener('click', (event) => {
  const newSphere = new Mesh(new SphereGeometry(0.5), new MeshBasicMaterial({ color: options.color }));
  newSphere.position.set(options.position.x, options.position.y, options.position.z);
  window.shapes.push({
    type: 'sphere',
    options: JSON.parse(JSON.stringify(options))
  });
  scene.add(newSphere);
  console.log(window.shapes)
});

addCube.addEventListener('click', (event) => {
  const newBox = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: options.color }));
  newBox.position.set(options.position.x, options.position.y, options.position.z);
  window.shapes.push({
    type: 'cube',
    options: JSON.parse(JSON.stringify(options))
  });
  scene.add(newBox);
});

removeLast.addEventListener('click', (event) => {
  if(scene.children[scene.children.length - 1] instanceof Mesh) {
    window.shapes.pop();
    scene.children.pop();
  }
});

removeAll.addEventListener('click', (event) => {
  while(scene.children[scene.children.length - 1] instanceof Mesh) {
    window.shapes.pop();
    scene.children.pop();
  }
});

const viewContainer = document.getElementById('view');
const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
viewContainer.appendChild(renderer.domElement);

export const scene = new Scene();
scene.background = new Color('#FFFFFF');

scene.add(new ArrowHelper( new Vector3(1, 0, 0), new Vector3(0, 0, 0), 1, '#FF0000'));
scene.add(new ArrowHelper( new Vector3(0, 1, 0), new Vector3(0, 0, 0), 1, '#00FF00'));
scene.add(new ArrowHelper( new Vector3(0, 0, 1), new Vector3(0, 0, 0), 1, '#0000FF'));

const camera = new PerspectiveCamera( 40, viewContainer.innerWidth / viewContainer.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

function setSize(container) {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );
}

setSize(viewContainer);

window.onresize = function () {
  setSize(document.getElementById('view'));
};

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();
controls.enablePan = true;
controls.enableDamping = true;

function update() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();