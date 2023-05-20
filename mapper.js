// https://docs.konghq.com/gateway/latest/plugin-development/pdk

class MapperPlugin {
  async access(kong) {

    let customerId = await kong.request.getHeader("X-Customer-Id");
    if(customerId){
      let cif = this.lookupCIFNumber(customerId);
      if(cif){
        await Promise.all([
          kong.service.request.setHeader(`X-CIF-Number`, cif),
          kong.service.request.clearHeader("X-Customer-Id"),
        ]);
      }
    }

    let accountId = await kong.request.getHeader("X-Account-Id");
    if(accountId){
      let accountNumber = this.lookupAccountNumber(accountId);
      if(accountNumber){
        await Promise.all([
          kong.service.request.setHeader(`X-Account-Number`, accountNumber),
          kong.service.request.clearHeader("X-Account-Id"),
        ]);
      }
    }
  }

  lookupAccountNumber(accountId){
    return "1";
  }

  lookupCIFNumber(customerId){
    return "2";
  }
}

module.exports = {
  Plugin: MapperPlugin,
  Version: "0.1.0"
};