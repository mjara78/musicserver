class VirtualRepeaterList {

    constructor(numColumns, pageSize, numItems, modelService, filter) {
        this.numColumns = numColumns;
        this.pageSize = pageSize;
        this.numItems = numItems;
        this.filter = filter;

        this.loadedData = {};

        this.modelService = modelService;
    }

    getItemAtIndex(index) {

        var pageNumber = Math.floor((index * this.numColumns) / this.pageSize);
        var page = this.loadedData[pageNumber];

        if (page) {
            return page[index % (this.pageSize / this.numColumns)];
        } else if (page !== null) {
            // Set the page to null so we know it is already being fetched.      
            this.loadedData[pageNumber] = null
                // Call the function for get data of page
           
            this.modelService.fetchPage(pageNumber * this.pageSize, this.pageSize, this.filter)
                .then(data => {
                    this.loadedData[pageNumber] = []
                        // Split data on arrays with columns 
                    while (data.length) {
                        this.loadedData[pageNumber].push(data.splice(0, this.numColumns));
                    }
                });

            // return null ??
        }
    }

    getLength() {
        return Math.ceil(this.numItems / this.numColumns)
    }
}

export default VirtualRepeaterList