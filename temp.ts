function dumpObject(instance:any) {
   // Dump instance properties and its prototype chain
   console.log("=== Instance Properties ===");
   console.log(instance);

   let currentInstance = instance;
   let depth = 0;

   while (currentInstance) {
       console.log(
           `Prototype chain depth ${depth} (Class: ${currentInstance.constructor.name}):,
           ${Object.getOwnPropertyNames(currentInstance)}`
       );
       currentInstance = Object.getPrototypeOf(currentInstance);
       depth++;
   }

   // Dump class prototype chain
   const classPrototype = Object.getPrototypeOf(instance.constructor);
   console.log("\n=== Class Prototype ===");
   console.log(classPrototype);

   let currentClass = classPrototype;
   depth = 0;

   while (currentClass) {
       console.log(
          ` Class prototype chain depth ${depth} (Class: ${currentClass.constructor ? currentClass.constructor.name : 'null'}):,
            ${Object.getOwnPropertyNames(currentClass)}`
       );
       currentClass = Object.getPrototypeOf(currentClass);
       depth++;
   }
}

dumpObject(new Date());
