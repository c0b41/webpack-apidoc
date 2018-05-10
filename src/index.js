import colors from 'ansi-colors'
import apidoc from 'apidoc'
import info from '../package.json'

export default class Apidoc {

    constructor (options) {

        if(!options){
            throw new Error('Options must be Set')
        }
        this.options = {}

        const _opt = Object.assign({
            dest: options.dest || options.o || 'doc/',
            config: options.config || options.c || options.src,
            src: options.src || options.i,
            silent: true
            },
            options);
    
        
        if(_opt.template || _opt.t){
            _opt.template =  _opt.template || _opt.t;
        }
        
        this.options = _opt
    }

    async make () {

        if(this.options.src){
            const chunk = await apidoc.createDoc(this.options)

            if(typeof chunk === 'object') {

                console.log(` ${colors.green(`Apidoc created... `)} `)
                return true

            }else{
                throw new Error(`Execution terminated (set \" debug: true \" in webpack config file for details.`)
            }
    
        }else{
            throw new Error(`Folder specified.`)
        }
    }

    apply (compiler) {

        compiler.hooks.emit.tap(info.name,async (compilation) => {
            await this.make()
        })        

    }


}