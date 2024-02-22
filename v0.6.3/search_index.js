var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = ArDCA","category":"page"},{"location":"#ArDCA","page":"Home","title":"ArDCA","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Autoregressive model learning for protein inference.","category":"page"},{"location":"#Package-Features","page":"Home","title":"Package Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Learn model from multiple sequence alignment\nSample from the model ","category":"page"},{"location":"","page":"Home","title":"Home","text":"See the Index for the complete list of documented functions and types.","category":"page"},{"location":"#Overview","page":"Home","title":"Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Protein families are given in form of multiple sequence alignments (MSA) D = (a^m_i i = 1dotsLm = 1dotsM) of M proteins of aligned length L. The entries a^m_i equal either one of the standard 20 amino acids, or the alignment gap . In total, we have q = 21 possible different symbols in D. The aim of unsupervised generative modeling is to earn a statistical model P(a_1dotsa_L) of (aligned) full-length sequences, which faithfully reflects the variability found in D: sequences belonging to the protein family of interest should have comparably high probabilities, unrelated sequences very small probabilities. Here we propose a computationally efficient approach based on autoregressive models. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"We start from the exact decomposition:","category":"page"},{"location":"","page":"Home","title":"Home","text":"P(a_1dotsa_L) = P(a_1) cdot P(a_2a_1) cdot dots cdot P(a_La_1dotsa_L-1)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Here, we use the following parametrization:","category":"page"},{"location":"","page":"Home","title":"Home","text":"P(a_i  a_1dotsa_i-1) = fracexp left h_i(a_i) + sum_j=1^i-1 J_ij(a_ia_j)right z_i(a_1dotsa_i-1)","category":"page"},{"location":"","page":"Home","title":"Home","text":"where:","category":"page"},{"location":"","page":"Home","title":"Home","text":"z_i(a_1dotsa_i-1)= sum_a=1^q exp left h_i(a) + sum_j=1^i-1 J_ij(aa_j)right ","category":"page"},{"location":"","page":"Home","title":"Home","text":"is a the normalization factor. In machine learning, this parametrization is known as soft-max regression, the generalization of logistic regression to multi-class labels.","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The typical pipeline to use the package is:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Compute ArDCA parameters from a multiple sequence alignment:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> arnet,arvar=ardca(filefasta; kwds...)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Generate 100 new sequences, and store it in an Ltimes 100 array of integers.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> Zgen =  sample(arnet,100);","category":"page"},{"location":"#Multithreading","page":"Home","title":"Multithreading","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To fully exploit the the multicore parallel computation, julia should be invoked with","category":"page"},{"location":"","page":"Home","title":"Home","text":"$ julia -t nthreads # put here nthreads equal to the number of cores you want to use","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you want to set permanently the number of threads to the desired value, you can either create a default environment variable export JULIA_NUM_THREADS=24 in your .bashrc. More information here","category":"page"},{"location":"#Tutorial","page":"Home","title":"Tutorial","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We will assume we have a Multiple Sequence Alignment (MSA)in FASTA format. We aim at","category":"page"},{"location":"","page":"Home","title":"Home","text":"Given a MSA, generate a sample\nGiven a MSA, predict contacts\nGiven a MSA, predict the mutational effect in all (ungapped) position of a given target sequence ","category":"page"},{"location":"#Load-ArDCA-package","page":"Home","title":"Load ArDCA package","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The following cell loads the package ArDCA (Warning: the first time it takes a while)","category":"page"},{"location":"","page":"Home","title":"Home","text":"The mypkgdir variable should be set to your path/to/package dir.","category":"page"},{"location":"","page":"Home","title":"Home","text":"We will use the PF00014 protein family available in data/PF14/ folder of the package/","category":"page"},{"location":"","page":"Home","title":"Home","text":"mypkgdir = normpath(joinpath(pwd(),\"..\"))\ndatadir=joinpath(mypkgdir,\"data\") # put here your path\nusing Pkg\nPkg.activate(mypkgdir)\nusing ArDCA","category":"page"},{"location":"#Learn-the-autoregressive-parameters","page":"Home","title":"Learn the autoregressive parameters","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"As a preliminary step, we learn the field and the coupling parameters hJ from the MSA. To do so we use the ardca method that return the parameters (stored in arnet in the cell below), and the alignment in numerical format and other algorithms variables (stored in arvar in the cell below). The default autoregressive order is set to :ENTROPIC. We set the L_2 regularization to 0.02 for the J and 0.001 for the h.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The keyword arguments for the ardca method are (with their default value):","category":"page"},{"location":"","page":"Home","title":"Home","text":"lambdaJ::Real=0.01 coupling L₂ regularization parameter (lagrange multiplier)\nlambdaH::Real=0.01 field L₂ regularization parameter (lagrange multiplier)\npc_factor::Real=0 pseudocount factor for calculation of p0\nepsconv::Real=1.0e-5 (convergence parameter)\nmaxit::Int=1000 (maximum number of iteration - don't change)\nverbose::Bool=true (set to false to suppress printing on screen)\nmethod::Symbol=:LD_LBFGS (optimization method)\npermorder::Union{Symbol,Vector{Ti}}=:ENTROPIC (permutation order). Possible values are: [:NATURAL, :ENTROPIC, :REV_ENTROPIC, :RANDOM] or a custom permutation vector.","category":"page"},{"location":"","page":"Home","title":"Home","text":"arnet,arvar=ardca(\"data/PF14/PF00014_mgap6.fasta.gz\", verbose=false, lambdaJ=0.02,lambdaH=0.001);","category":"page"},{"location":"#1.-Sequence-Generation","page":"Home","title":"1. Sequence Generation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We now generate M sequences using the sample method:","category":"page"},{"location":"","page":"Home","title":"Home","text":"M = 1_000;\ngenerated_alignment = sample(arnet,M);","category":"page"},{"location":"","page":"Home","title":"Home","text":"The generated alignment has is a  𝐿×𝑀  matrix of integer where  𝐿  is the alignment's length, and  𝑀  the number of samples.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Interestingly, we for each sequence we can also compute the likelihood with the samplewithweights method.","category":"page"},{"location":"","page":"Home","title":"Home","text":"loglikelihood,generated_alignment = sample_with_weights(arnet,M);","category":"page"},{"location":"#2.-Contact-Prediction","page":"Home","title":"2. Contact Prediction","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We can compute the epistatic score for residue-residue contact prediction. To do so, we can use the epistatic_score method. The epistatic score is computed on any target sequence of the MSA. Empirically, it turns out the the final score does not depend much on the choice of the target sequence. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The autput is contained in a Vector of Tuple ranked in descendic score order. Each Tuple contains ijs_ij where s_ij is the epistatic score of the residue pair ij. The residue numbering is that of the MSA, and not of the unaligned full sequences.","category":"page"},{"location":"","page":"Home","title":"Home","text":"target_sequence = 1\nscore=epistatic_score(arnet,arvar,target_sequence)","category":"page"},{"location":"#3.-Predicting-mutational-effects","page":"Home","title":"3. Predicting mutational effects","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For any reference sequence, we can easily predict the mutational effect for all single mutants. Of course we can extract this information only for the non-gapped residues of the target sequence. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is done with the dms_single_site method, which returns a q×L matrix D containing log(P(mut))log(P(wt)) for all single site mutants of the reference sequence seqid (i.e. the so-called wild type sequence), and idxgap a vector of indices of the residues of the reference sequence that contain gaps (i.e. the 21 amino-acid) for which the score has no sense and is set by convention to +Inf.","category":"page"},{"location":"","page":"Home","title":"Home","text":"A negative value indicate a beneficial mutation, a value 0 indicate the wild-type amino-acid.","category":"page"},{"location":"","page":"Home","title":"Home","text":"target_sequence = 1\nD,idxgap=dms_single_site(arnet,arvar,target_sequence)","category":"page"},{"location":"#index","page":"Home","title":"Methods Reference","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [ArDCA]","category":"page"},{"location":"#ArDCA.ardca-Tuple{String}","page":"Home","title":"ArDCA.ardca","text":"ardca(filename::String; kwds...)\n\nRun ardca on the fasta alignment in filename\n\nReturn two struct: ::ArNet (containing the inferred hyperparameters) and ::ArVar\n\nOptional arguments:\n\nmax_gap_fraction::Real=0.9 maximum fraction of insert in the sequence\nremove_dups::Bool=true if true remove duplicated sequences\ntheta=:auto if :auto compute reweighint automatically. Otherwise set a Float64 value 0 ≤ theta ≤ 1\nlambdaJ::Real=0.01 coupling L₂ regularization parameter (lagrange multiplier)\nlambdaH::Real=0.01 field L₂ regularization parameter (lagrange multiplier)\npc_factor::Real=1/size(Z,2) pseudocount factor for calculation of p0, defaults to one over the number of sequences.\nepsconv::Real=1.0e-5 convergence value in minimzation\nmaxit::Int=1000 maximum number of iteration in minimization\nverbose::Bool=true set to false to stop printing convergence info on stdout\nmethod::Symbol=:LD_LBFGS optimization strategy see NLopt.jl for other options\npermorder::Union{Symbol,Vector{Ti}}=:ENTROPIC permutation order. Possible values are :NATURAL,:ENTROPIC,:REV_ENTROPIC,:RANDOM or a custom permutation vector\n\nExamples\n\njulia> arnet, arvar =  ardca(\"pf14.fasta\", permorder=:ENTROPIC)\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.ardca-Union{Tuple{Ti}, Tuple{Matrix{Ti}, Vector{Float64}}} where Ti<:Integer","page":"Home","title":"ArDCA.ardca","text":"ardca(Z::Array{Ti,2},W::Vector{Float64}; kwds...)\n\nAuto-regressive analysis on the L×M alignment Z (numerically encoded in 1,…,21), and the M-dimensional normalized  weight vector W.\n\nReturn two struct: ::ArNet (containing the inferred hyperparameters) and ::ArVar\n\nOptional arguments:\n\nlambdaJ::Real=0.01 coupling L₂ regularization parameter (lagrange multiplier)\nlambdaH::Real=0.01 field L₂ regularization parameter (lagrange multiplier)\npc_factor::Real=0 pseudocount factor for calculation of p0, defaults to one over the number of sequences.\nepsconv::Real=1.0e-5 convergence value in minimzation\nmaxit::Int=1000 maximum number of iteration in minimization\nverbose::Bool=true set to false to stop printing convergence info on stdout\nmethod::Symbol=:LD_LBFGS optimization strategy see NLopt.jl for other options\npermorder::Union{Symbol,Vector{Ti}}=:ENTROPIC permutation order. Possible values are :NATURAL,:ENTROPIC,:REV_ENTROPIC,:RANDOM or a custom permutation vector\n\nExamples\n\njulia> arnet, arvar= ardca(Z,W,lambdaJ=0,lambdaH=0,permorder=:REV_ENTROPIC,epsconv=1e-12);\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.dms_single_site-Tuple{ArNet, ArVar, Int64}","page":"Home","title":"ArDCA.dms_single_site","text":"dms_single_site(arnet::ArNet, arvar::ArVar, seqid::Int; pc::Float64=0.1)\n\nReturn a q×L matrix of containing -log(P(mut))/log(P(seq)) for all single site mutants of the reference sequence seqid, and a vector of the indices of the residues of the reference sequence that contain gaps (i.e. the 21 amino-acid) for which the score has no sense and is set by convention to +Inf. A negative value indicate a beneficial mutation, a value 0 indicate the wild-type amino-acid.\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.loglikelihood-Tuple{ArNet, ArVar}","page":"Home","title":"ArDCA.loglikelihood","text":"loglikelihood(arnet::ArNet, arvar::ArVar)\n\nReturn the vector of loglikelihoods computed from arvar.Z under the model arnet. size(arvar.Z) == N,M where N is the sequences length, and M the number of sequences. The returned vector has M elements reweighted by arvar.W\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.loglikelihood-Tuple{String, ArNet}","page":"Home","title":"ArDCA.loglikelihood","text":"loglikelihood(x0::String, arnet::ArNet) where {T<:Integer})\n\nReturn the loglikelihood of the String x0 under the model arnet. \n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.loglikelihood-Union{Tuple{T}, Tuple{Matrix{T}, ArNet}} where T<:Integer","page":"Home","title":"ArDCA.loglikelihood","text":"loglikelihood(x0::Matrix{T}, arnet::ArNet) where {T<:Integer})\n\nReturn the vector of loglikelihoods computed from Matrix x0 under the model arnet. size(x0) == N,M where N is the sequences length, and M the number of sequences. The returned vector has M elements.\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.loglikelihood-Union{Tuple{T}, Tuple{Vector{T}, ArNet}} where T<:Integer","page":"Home","title":"ArDCA.loglikelihood","text":"loglikelihood(x0::Vector{T}, arnet::ArNet) where {T<:Integer})\n\nReturn the loglikelihood of sequence x0 encoded in integer values in 1:q under the model arnet`. \n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.sample-Tuple{ArNet, Int64}","page":"Home","title":"ArDCA.sample","text":"sample(arnet::ArNet, msamples::Int)\n\nReturn a generated alignment in the form of a N × msamples  matrix of type ::Matrix{Int}  \n\nExamples\n\njulia> arnet,arvar=ardca(\"file.fasta\",verbose=true,permorder=:ENTROPIC, lambdaJ=0.001,lambdaH=0.001);\njulia> Zgen=Zgen=sample(arnet,1000);\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.sample_subsequence-Tuple{String, ArNet, Any}","page":"Home","title":"ArDCA.sample_subsequence","text":"sample_subsequence(x::String, arnet::ArNet, msamples)\n\nReturn a generated alignment in the form of a N × msamples  matrix of type ::Matrix{Int} and the relative probabilities under the model. The alignment is  forced to start with with a sequence x (in amino acid single letter alphabet)  and then autoregressively generated.\n\nExample\n\njulia> arnet,arvar=ardca(\"file.fasta\",verbose=true,permorder=:ENTROPIC, lambdaJ=0.001,lambdaH=0.001);\njulia> Wgen,Zgen=sample_subsequence(\"MAKG\",arnet,1000);\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.sample_subsequence-Union{Tuple{T}, Tuple{Vector{T}, ArNet, Any}} where T<:Integer","page":"Home","title":"ArDCA.sample_subsequence","text":"sample_subsequence(x::Vector{T}, arnet::ArNet, msamples)\n\nReturn a generated alignment in the form of a N × msamples  matrix of type ::Matrix{Int} and the relative probabilities under the model. The alignment is  forced to start with with a sequence x (in integer number coding)  and then autoregressively generated.\n\nExample\n\njulia> arnet,arvar=ardca(\"file.fasta\",verbose=true,permorder=:ENTROPIC, lambdaJ=0.001,lambdaH=0.001);\njulia> Wgen,Zgen=sample_subsequence([11,1,9,6],arnet,1000);\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.sample_with_weights-Tuple{ArNet, Any}","page":"Home","title":"ArDCA.sample_with_weights","text":"sample_with_weights(arnet::ArNet, msamples::Int)\n\nReturn a generated alignment in the form of a N × msamples  matrix of type ::Matrix{Int} and the relative probabilities under the module\n\nExamples\n\njulia> arnet,arvar=ardca(\"file.fasta\",verbose=true,permorder=:ENTROPIC, lambdaJ=0.001,lambdaH=0.001);\njulia> Wgen,Zgen=sample_with_weights(arnet,1000);\n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.siteloglikelihood-Tuple{Int64, ArNet, ArVar}","page":"Home","title":"ArDCA.siteloglikelihood","text":"siteloglikelihood(i::Int,arnet::ArNet, arvar::ArVar)\n\nReturn the loglikelihood relative to site i computed from arvar.Z under the model arnet. \n\n\n\n\n\n","category":"method"},{"location":"#ArDCA.softmax!-Tuple{Vector{Float64}}","page":"Home","title":"ArDCA.softmax!","text":"softmax(x::AbstractArray{<:Real})\n\nReturn the softmax transformation applied to x\n\n\n\n\n\n","category":"method"}]
}
