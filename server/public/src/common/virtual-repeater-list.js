class VirtualRepeaterList {

    constructor(pageSize, numItems, $msModel) {
        this.pageSize = pageSize;
        this.numItems = numItems;

        this.loadedData = {};

        this.$msModel = $msModel;
    }

    getItemAtIndex(index) {

        var pageNumber = Math.floor( index  / this.pageSize);
        var page = this.loadedData[pageNumber];

        if (page) {
            return page[index % this.pageSize ];
        } else if (page !== null) {
            // Set the page to null so we know it is already being fetched.
            this.loadedData[pageNumber] = null
                // Call the function for get data of page
            //this.loadedData[pageNumber] = this.$msModel.fetchPage(pageNumber * this.pageSize, this.pageSize)
            this.$msModel.fetchPage(pageNumber * this.pageSize, this.pageSize)
                .then(data => {
                    this.loadedData[pageNumber] = data
                });

            // return null ??
        }
    }

    getLength() {
        return this.numItems
    }
}

export default VirtualRepeaterList
