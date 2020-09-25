<template>
    <div>
          <base-header type="gradient-primary" class="pb-2 pb-6 pt-5 pt-md-8">  
            
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <companies-table title="Comapnies"></companies-table>
                </div>
            </div>
            <!-- <div class="row mt-5">
                <div class="col">
                    <projects-table type="dark" title="Dark Table"></projects-table>
                </div>
            </div> -->
        </div>

    </div>
</template>
<script>
  import companiesTable from './Tables/companiesTable'
  export default {
    name: 'tables',
    components: {
      companiesTable
    }
    
  };
</script>
<style></style>
