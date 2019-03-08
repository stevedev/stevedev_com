(function() {
  this.Art = class Art {
    constructor(contract_address, abi, callback1) {
      this.find_account = this.find_account.bind(this);
      this.find_art_data = this.find_art_data.bind(this);
      this.find_ownership_data = this.find_ownership_data.bind(this);
      this.contract_address = contract_address;
      this.abi = abi;
      this.callback = callback1;
      this.ready = false;
      this.art_data = null;
      this.web3 = new Web3();
      this.web3.setProvider(Web3.givenProvider || "ws://localhost:8546");
      this.contract = new this.web3.eth.Contract(this.abi, this.contract_address);
      console.log('contract', this.contract);
      this.find_account();
    }

    find_account() {
      return this.web3.eth.getAccounts().then((account) => {
        this.account_address = account[0];
        return this.find_art_data();
      });
    }

    find_art_data() {
      return this.contract.methods.artdata().call({
        from: this.account_address
      }).then((response) => {
        this.art_data = response;
        return this.find_ownership_data();
      }, function(e) {
        return console.error("Error loading art data", e);
      });
    }

    find_ownership_data() {
      return this.contract.methods.ownershipdata().call({
        from: this.account_address
      }).then((response) => {
        this.ownership_data = response;
        this.ready = true;
        if (typeof this.callback !== "undefined") {
          return this.callback(this);
        }
      });
    }

    title() {
      return this.art_data.title;
    }

    artistName() {
      return this.art_data.artistName;
    }

    yearCreated() {
      return this.art_data.yearCreated;
    }

    originCountryAndCity() {
      return this.art_data.originCountryAndCity;
    }

    artform() {
      return this.art_data.artform;
    }

    dimensions() {
      return this.art_data.dimensions;
    }

    firstSaleInfo() {
      return this.art_data.firstSaleInfo;
    }

    price() {
      return this.ownership_data.price;
    }

    artistPercentage() {
      return this.ownership_data.artistPercentage;
    }

    contractCreator() {
      return this.ownership_data.contractCreator;
    }

    currArtOwner() {
      return this.ownership_data.currArtOwner;
    }

    forsale() {
      return this.ownership_data.forsale;
    }

    uppstartPercentage() {
      return this.ownership_data.uppstartPercentage;
    }

    confirm_shipping_departure(shipping_code, callback) {
      return this.contract.methods.confirmShippingDeparture(shipping_code).send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('Confirm Shipping Departure Response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Problem confirming shipping departure:", e);
      });
    }

    set_price(price, callback) {
      return this.contract.methods.changePrice(price).send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error updating price", e);
      });
    }

    vote(vote_code, callback) {
      return this.contract.methods.disputeVote(vote_code).send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error voting", e);
      });
    }

    toggle_for_sale(callback) {
      return this.contract.methods.toggleForSale().send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error changing sales status", e);
      });
    }

    finish_and_release(callback) {
      return this.contract.methods.finish().send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error finishing and releasing.", e);
      });
    }

    buy(callback) {
      return this.contract.methods.buy().send({
        from: this.account_address,
        value: this.price()
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error buying.", e);
      });
    }

    refund(callback) {
      return this.contract.methods.refund().send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error refunding.", e);
      });
    }

    raise_dispute(callback) {
      return this.contract.methods.raiseDispute().send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error raising dispute.", e);
      });
    }

    confirm_shipping_arrival(callback) {
      return this.contract.methods.confirmShippingArrival().send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error confirming shipping arrival.", e);
      });
    }

    set_artdata(options, callback) {
      return this.contract.methods.setArtData(options.title, options.artistName, options.yearCreated, options.originCountryAndCity, options.artform, options.dimensions, options.firstSaleInfo).send({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error setting art data.", e);
      });
    }

    retrieve_profits(callback) {
      return this.contract.methods.storedProfit().call({
        from: this.account_address
      }).then(function(response) {
        if (callback) {
          callback('success');
        }
        return console.log('response', response);
      }, function(e) {
        if (callback) {
          callback('fail');
        }
        return console.error("Error confirming shipping arrival.", e);
      });
    }

  };

  this.Buyer = class Buyer {
    constructor(art, abi) {
      this.find_account = this.find_account.bind(this);
      this.art = art;
      this.abi = abi;
      this.ready = false;
      this.art_data = null;
      this.web3 = new Web3();
      this.web3.setProvider(Web3.givenProvider || "ws://localhost:8546");
      this.find_account();
    }

    find_account() {
      return this.web3.eth.getAccounts().then((account) => {
        this.account = account;
        return this.account_address = account[0];
      });
    }

  };

  this.Seller = class Seller {
    constructor(art, abi) {
      this.find_account = this.find_account.bind(this);
      this.art = art;
      this.abi = abi;
      this.ready = false;
      this.art_data = null;
      this.web3 = new Web3();
      this.web3.setProvider(Web3.givenProvider || "ws://localhost:8546");
      this.find_account();
    }

    find_account() {
      return this.web3.eth.getAccounts().then((account) => {
        this.account = account;
        return this.account_address = account[0];
      });
    }

  };

}).call(this);
