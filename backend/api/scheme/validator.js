const Ajv=require('ajv');
const ajv=new Ajv.default({allErrors:true,removeAdditional:true});
addFormats=require('ajv-formats');
addFormats(ajv);

ajv.addKeyword('isNotEmpty',{
    type:'string',
    validate:function(schema,data){
        return typeof data==='string' && data.trim()!==''
    },
    errors:false,
})
module.exports={
    addSchemas:(schemas)=>{
        for(const schema in schemas){
            ajv.addSchema(schemas[schema],schema);
        }
    },
    validate :(schemaName) => {
        return (req, res, next) => {
          let valid = ajv.validate(schemaName, req.body);
          if (!valid) {
            return res.status(400).send(errorResponse(ajv.errors));
          }
          next();
        };
    }
} 
  /**
   * Validates incoming request bodies against the given schema,
   * providing an error response when validation fails
   * @param  {String} schemaName - name of the schema to validate
   * @return {Object} response
   */
   /**
    * Format error responses
    * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
    * @return {String} formatted api response
    */
    function errorResponse(schemaErrors) {
        const errors = schemaErrors.map((error) => {
        return {
            path: error.dataPath,
            message: error.message
        };
        });
   return {errors};
}