import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { actions } from 'data'
import { getData } from './selectors'
import Error from './template.error'
import Loading from './template.loading'
import Success from './template.success'

class SecondStepContainer extends React.PureComponent {
  onGoBack = () => {
    this.props.actions.secondStepCancelClicked()
  }

  render () {
    const { data, actions } = this.props
    return data.cata({
      Success: value => (
        <Success
          coin='XLM'
          {...value}
          handleBack={this.onGoBack}
          handleSubmit={actions.secondStepSubmitClicked}
        />
      ),
      Failure: message => <Error>{message}</Error>,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = state => ({
  data: getData(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.sendXlm, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondStepContainer)
