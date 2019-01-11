<template>
    <div>
        <h2>Os numeros ordenados aparecerao aq em baixo, caso queira acompanhar abra o console</h2>
        <br/>
        <br/>
        <label v-if="numerosOrdenados.length != 0" >Ordenacao {{ numerosOrdenados }}</label><br/>
    </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
let pageurl = '?page='
let page = 1

export default {
    name: 'Ordenacao',
    data(){
        return {
            numeros:[],
            numerosOrdenados:[],
        }
    },
    mounted(){   
        let self = this
        this.$http.get('http://challenge.dienekes.com.br:8888/api/numbers')
        .then(function(data){
            console.log(data)
            if(data.body.length != 0){
                self.numeros = self.numeros.concat(data.body)
                this.buscarNumeros(page)
            }
        })
    },
    methods: {
        ordenar(){
           this.numerosOrdenados = this.quickSort(this.numeros,0,this.getLen()-1)
        },
        getLen(){
            return this.numeros.length
        },    
        buscarNumeros(page){
            let _this = this;
            this.$http.get('http://challenge.dienekes.com.br:8888/api/numbers'+pageurl+page)
                .then(function(data){
                    console.log(data)
                    if(data.body.numbers.length != 0){
                        _this.numeros = _this.numeros.concat(data.body.numbers)
                      this.buscarNumeros(page+1)
                    }else{
                        this.ordenar()
                    }    
                }).catch(function(){
                   this.buscarNumeros(page)
                })
        },
        quickSort(arr, esq, dir){
          let len = arr.length
          let pivo
          let particaoIndex
            
            if(esq < dir){
                pivo =dir;
                particaoIndex = this.partition(arr, pivo, esq, dir);
                
                this.quickSort(arr, esq, particaoIndex - 1);
                this.quickSort(arr, particaoIndex + 1, dir);
            }
            return arr;
        },
        partition(arr, pivot, left, right){
            let pivotValue = arr[pivot],
            partitionIndex = left;

            for(var i = left; i < right; i++){
                if(arr[i] < pivotValue){
                    this.swap(arr, i, partitionIndex);
                    partitionIndex++;
                }
            }
            this.swap(arr, right, partitionIndex);
            return partitionIndex;
        },
        swap(arr, i, j){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
}

</script>
