<template>
   <div class="router-content">
        <el-row>
            <el-col :span="16">
               <el-steps :active="2" align-center>
                  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
      data () {
        return {
        }
      }
    }
</script>

