"use strict";

class carPhys{


        
        

        //make consturctor
        constructor(x,y,z, yRot){
            this.x = x;
            this.y = y;
            this.z = z;
            this.yRot = 0;
            this.vx = 0.0;
            this.vz = 0.0;
            this.v = 0.0;
            this.throttle = 0.0;
            this.brake = 0.0;
        }

    updateCarPos(){
        var angleCar = this.yRot * Math.PI / 180;
        var angleInertia = Math.atan2(this.vz, this.vx);
        var angleDiff = angleCar - angleInertia;
       // console.log("angleCar: " + angleCar + " angleInertia: " + angleInertia);

        if(Math.abs(angleCar-angleInertia) > Math.PI/4){


        }


        if(this.brake > 0.0 && this.v >= 0.0) this.v -= this.brake;
        if(this.v < 0.0) this.v = 0.0;
        this.v += this.throttle;

        this.vx = -Math.sin(this.yRot * Math.PI / 180)*this.v;
        this.vz = -Math.cos(this.yRot * Math.PI / 180)*this.v;

        this.x += this.vx;
        this.z += this.vz;
        /*
       
        // make x a y drive like a car
        
        this.x -= Math.sin(this.yRot * Math.PI / 180) * this.v;
        this.z -= Math.cos(this.yRot * Math.PI / 180) * this.v;

        //console.log(this.throttle);
        */
    }
        getX(){

            return this.x;
        }

        getY(){
            return this.y;
        }

        getZ(){
            return this.z;
        }

        getRot(){
            return this.yRot;
        }
        


    getKeys(deltaTime){
        this.throttle = 0.0;
        this.brake = 0.0;
        if(Input.keyHold("arrowup")){
            this.brake = 0.0;
           if(this.throttle < 100.0){
                this.throttle += 0.05 * deltaTime;
           }
        }
        if(Input.keyHold("arrowdown")){
            this.throttle = 0.0;
            this.brake += 0.2 * deltaTime;
        }

        if(Input.keyHold("arrowleft")){
           if(this.v > 0.0001) this.yRot += (this.v*0.01) + (2.8/Math.pow(this.v+0.23,2)) * 1.5 * deltaTime;
        }

        if(Input.keyHold("arrowright")){
            if(this.v > 0.0001) this.yRot -= (this.v*0.01) + (2.8/Math.pow(this.v+0.23,2)) * 1.5 * deltaTime;
        }
    }

    

}