<script setup>
import { ref } from 'vue'

defineProps({
    contractorInfo: [],
    ContractorAddress: string,
    showContractor: Boolean,
})




//voteaction
const vote = async(isapprover) => {
  const walletType = userWallet.walletType;
  console.log("test---------")
  
  if (walletType === 'Eth') {
    const res = await votestoEth(isapprover, ContractorAddress.value);
    if (res.everHash) {
      ElNotification({
        title: 'Vote Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Vote Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      });
    }
  }
  if ( walletType === 'Ar' ) {
    const res = await votestoAr(isapprover, ContractorAddress.value)
    if (res.everHash) {
      ElNotification({
        title: 'Vote Success',
        message: `response is: ${res.everHash}`,
        type: 'success',
      })
    } else {
      ElNotification({
        title: 'Vote Failed',
        message: `response is: ${res.response.data}`,
        type: 'error',
      })
    }
  }
  // Wait 5 seconds to trigger an interface refresh
  setTimeout(() => {
    location.reload()
  }, 5000);
}

</script>

<template>
    <el-dialog
      v-model="showContractor"
      width="500"
      align-center
      class="dialog"
      v-for="contractor in contractorInfo" :key="contractor.id"
    >
      <Text style=" font-size: 35px; font-weight: bold; color: #666699; font-family: Arial, sans-serif; letter-spacing: 1px">Contractor Info</Text>
      <el-descriptions
        class="margin-top"
        title="w"
        :column="1"
        :size="Default"
        
        border
      >
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              Name
            </div>
          </template>
          {{ contractor.name }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              description
            </div>
          </template>
          {{ contractor.description }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              infavor
            </div>
          </template>
          {{ contractor.infavor / 10**18 }}
        </el-descriptions-item>
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              minVoteDuration
            </div>
          </template>
          {{ contractor.minVoteDuration / 60 / 60 / 24}} day
        </el-descriptions-item>
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              maxVoteDuration
            </div>
          </template>
          {{ contractor.maxVoteDuration / 60 / 60 / 24}} day
        </el-descriptions-item>
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              confirmDuration
            </div>
          </template>
          {{ contractor.confirmDuration / 60 / 60 / 24}} day
        </el-descriptions-item>
        <el-descriptions-item label-class-name="votes_label" class-name="votes">
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              approved_status
            </div>
          </template>
          {{ contractor.approved ? 'approve' : 'fail' }} 
        </el-descriptions-item>
      </el-descriptions>
      

      <el-radio-group
        v-model="aggresor" 
        class="ml-4"
      >
        <el-radio label="true" size="large">agree</el-radio>
        <el-radio label="false" size="large">disagree</el-radio>
      </el-radio-group>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="vote(aggresor)">
            Vote
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
