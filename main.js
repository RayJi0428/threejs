(function start() {
	console.log('hello threejs!');
}());

var camera, scene, renderer;
var geometry, material, mesh;

//初始化
init();

var box;
var car;
var mixer;
var clock;
function init() {

	clock = new THREE.Clock();

	//建立renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//建立camera
	/*
	PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
	http://kcs.kcjh.ptc.edu.tw/~spt/computer/digital-image/foaus-len.htm
	fov — Camera frustum vertical field of view.
	aspect — Camera frustum aspect ratio.
	near — Camera frustum near plane.
	far — Camera frustum far plane.
	*/
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = 40;
	camera.position.y = 10;
	//camera.position.z = 1;

	//建立mesh
	let size = 100;
	geometry = new THREE.SphereGeometry(size, size, size);//CubeGeometry
	material = new THREE.MeshLambertMaterial(
		{
			color: 0xF3FFE2,
			wireframe: false,//frame
			emissive: 0xff0000//glow
		}
	);//MeshBasicMaterial,MeshNormalMaterial
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, -1000);

	/*
	var loader = new THREE.BabylonLoader();
	loader.load('assets/test.babylon', function (babylonScene ) {
		scene = babylonScene;
		//scene.add( object );		
	});
	*/

	//建立scene並放上mesh
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xaaaaaa);

	var gltfLoader = new THREE.GLTFLoader();
	gltfLoader.load('assets/test.gltf',
		function (gltf) {
			//scene = gltf.scene;
			scene.add(gltf.scene);
			car = gltf.scene.children[0];
			box = gltf.scene.children[1];
			mixer = new THREE.AnimationMixer(car);
			mixer.clipAction(gltf.animations[0]).play();
			animate();
			//scene = gltf.scene;
			//scene = gltf.scene;
			//camera = gltf.cameras[0];
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (error) {
			console.log('An error happened');
		}
	);

	//light
	var light = new THREE.DirectionalLight(0xffffff, 20);
	light.position.z = 20;
	light.position.y = 10;
	scene.add(light);

	//var light1 = new THREE.PointLight(0xffffff, 0.5);
	//scene.add(light1);


	var geometry;

	//Cube
	geometry = new THREE.CubeGeometry(20, 10, 10);
	var cubeMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	var geObj = new THREE.Mesh(geometry, cubeMat);
	//scene.add(geObj);
}

function animate() {

	//觸發下次animate
	requestAnimationFrame(animate);

	mixer.update(clock.getDelta());
	//轉動mesh
	/*
	if (car){
		car.rotation.y += 0.1;
	}
	
	if (box){
		box.rotation.y += 0.05;
	}
	*/

	//car.rotation.y += 0.02;

	//更新畫面
	renderer.render(scene, camera);

}

